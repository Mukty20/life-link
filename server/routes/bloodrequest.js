import express from 'express'
const route = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import Hospital from '../models/hospital.js'
import Bloodrequest from '../models/bloodrequest.js'
import HospitalAuth from '../auth/hospitalAuth.js'
import Matched from '../models/matchedDonor.js'
import Donation from '../models/donation.js'



route.get('/api/blood-request', HospitalAuth, async(req, res) => {

    try {

        let bloodrequest = await Bloodrequest.find({hospitalId: req.hospital.hospitalId})

        bloodrequest = [...bloodrequest].reverse()

        res.status(200).json({data: bloodrequest, successful: true })

    } catch (error) {

        res.status(500).json({successful: false})

    }

})


route.get('/api/total-blood-request', async(req, res) => {

    try {

        let bloodrequest = await Bloodrequest.find()

        bloodrequest = [...bloodrequest].reverse()

        res.status(200).json({data: bloodrequest, successful: true })

    } catch (error) {

        res.status(500).json({successful: false})

    }

})








route.get('/api/matched-donor', HospitalAuth, async(req, res) => {

    try {

        let matched = await Matched.find({hospitalId: req.hospital.hospitalId}).populate('donorId')

        matched = [...matched].reverse()

        res.status(200).json({data: matched, successful: true})
        
    } catch (error) {
        
        res.status(500).json({ successful: false })

    }

})



route.get('/api/total-donor', HospitalAuth, async(req, res) => {

    try {

        let totalDonations = await Donation.find({hospitalId: req.hospital.hospitalId})

        totalDonations = [...totalDonations].reverse()

        res.status(200).json({data: totalDonations, successful: true})
        
    } catch (error) {
        
        res.status(500).json({ successful: false })

    }

})








route.post('/api/blood-request',HospitalAuth, async(req, res) => {

    const { bloodType, unit, urgency, requiredDate, note } = req.body

    try {
        const bloodrequest = new Bloodrequest({
            bloodType: bloodType,
            unit: unit,
            urgency: urgency,
            requiredDate: requiredDate,
            note: note,    
            status: 'pending',
            hospital: req.hospital.hospitalname,
            hospitalId: req.hospital.hospitalId
        })

        await bloodrequest.save()

        res.status(200).json({message:'donation submittted successfully'})
        console.log('successful');
        
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message: 'could not post request'})
    }

})




// status patch request update
route.patch('/api/blood-req-status', async(req, res) => {

    const { reqId } = req.body

    try {

        const updateStatue = await Bloodrequest.findByIdAndUpdate(reqId,{
            $set: { status: 'completed' }},
            {new: true}
        )

        if(!updateStatue) {

            res.status(200).json({message:'unable to update'})
        }

        await updateStatue.save()
        res.status(200).json({successful: true ,data: updateStatue, message:'update successfully'})
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message:'server error occur'})
        
    }
})






route.delete('/api/blood-req/:reqId', async(req, res) => {

    const { reqId } = req.params

    try {

        const updateStatue = await Bloodrequest.findByIdAndDelete(reqId)

        if(!updateStatue) return res.status(200).json({message:'unable to delete request'})

        const findMatch = await Matched.findOneAndDelete({reqId: reqId})

        if(!findMatch) return res.status(200).json({message:'unable to delete match'})


        res.status(200).json({successful: true , message:'deleted successfully', data: updateStatue})
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({message:'server error occur'})
        
    }
})











export default route