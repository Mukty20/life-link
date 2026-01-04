import express from 'express'
const route = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.js'
import Hospital from '../models/hospital.js'






//user signup
route.post('/api/signup-donor', async(req, res) => {

    const { fullName, username, email, password, confirmPassword, age, bloodType, location, phone, userType, status }  = req.body;

    

    try {
        const emailCheck = await User.findOne({email})
        if(emailCheck) return res.json({message: 'email already exist go to login'})

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            email,
            password: hashedPassword,
            fullName, 
            username,
            confirmPassword, 
            age, 
            bloodType, 
            location, 
            phone, 
            userType,
            status
        })

        await user.save()

        res.status(200).json({message: 'sign up successful'})

        
    } catch (error) {

        res.status(500).json({message:'error could not sign user up'})
    }
})








//hopital signup
route.post('/api/signup-hospital', async(req, res) => {

    const { fullName, username, email, password, confirmPassword, age, bloodType, location, phone, userType, status }  = req.body;

    

    try {
        const emailCheck = await Hospital.findOne({email})
        if(emailCheck) return res.json({message: 'email already exist go to login'})

        const hashedPassword = await bcrypt.hash(password,10)

        const hospital = new Hospital({
            email,
            password: hashedPassword,
            fullName, 
            username,
            confirmPassword, 
            age, 
            bloodType, 
            location, 
            phone, 
            userType,
            status
        })

        await hospital.save()

        res.status(200).json({message: 'sign up successful'})

        
    } catch (error) {

        res.status(500).json({message:'error could not sign user up'})
    }
})


export default route;