import express from 'express'
const route = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.js'
import Hospital from '../models/hospital.js'
import Bloodrequest from '../models/bloodrequest.js'
import Donation from '../models/donation.js'
import Matched from '../models/matchedDonor.js'
import userAuth from '../auth/userAuth.js'






route.get('/api/user-donation', userAuth, async(req, res) => {
    try {

        let donation = await Donation.find({donorId: req.user.userId}).populate('hospitalId', 'username')

        donation = [...donation].reverse()

        res.status(200).json({data: donation, successful: true })

    } catch (error) {

        res.status(500).json({successful: false})
    }
})






route.get('/api/donation', userAuth, async(req, res) => {
    try {

        let donation = await Donation.find()

        donation = [...donation].reverse()

        res.status(200).json({data: donation, successful: true })

    } catch (error) {

        res.status(500).json({successful: false})

    }
})




route.get('/api/hospital', userAuth, async(req, res) => {

    try {

        let hospital = await Hospital.find()

        hospital = [...hospital].reverse()

        res.status(200).json({data: hospital, successful: true})
        
    } catch (error) {
        
        res.status(500).json({ successful: false })

    }

})










route.post('/api/donation',userAuth, async(req, res) => {

    const { fullName, bloodType, age, location, phone, email, hospitalId, hospitalname, lastDonationDate, healthConditions, availability, preferredDate, preferredTime, emergencyContact, emergencyPhone, } = req.body

    try {
        const donation = new Donation({
            fullName, 
            bloodType, 
            age, 
            location, 
            phone, 
            email, 
            hospitalId,
            hospitalname,
            lastDonationDate, 
            healthConditions, 
            availability, 
            preferredDate, 
            preferredTime, 
            emergencyContact, 
            emergencyPhone,
            donorId: req.user.userId,
        })

        await donation.save()

        res.status(200).json({message:'donation submittted successfully'})
        console.log('successful');
        
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message: 'could not post request'})
    }

})




route.post('/api/add-to-donor',userAuth, async(req, res) => {

    const { reqId, hospitalId } = req.body

    
    
    try {

        const alreadyDonated = await Matched.findOne({ reqId, hospitalId, donorId: req.user.userId,})

        if (alreadyDonated) return res.status(400).json({ message: "already donated" });


        const matched = new Matched({
            donorId:req.user.userId,
            reqId,
            hospitalId
        })

        await matched.save()

        const updateStatue = await Bloodrequest.findByIdAndUpdate(reqId,{
            $push: { donors: req.user.userId}
        })

        if(!updateStatue) {

            res.status(200).json({message:'unable to update'})
        }

        res.status(200).json({successful: true ,data: updateStatue, message:'donor added successfully'})
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message:'server error occur'})
        
    }
})



export default route


