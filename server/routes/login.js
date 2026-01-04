import express from 'express'
const route = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.js'
import userAuth from '../auth/userAuth.js'
import HospitalAuth from '../auth/hospitalAuth.js'
import Hospital from '../models/hospital.js'




route.get('/api/check-auth', userAuth, async (req, res) => {

    console.log(req.user);

    return res.status(200).json({ authenticated: true, user: req.user})
    

})

route.get('/api/check-hospital-auth', HospitalAuth, async (req, res) => {

    console.log(req.hospital);

    return res.status(200).json({ authenticated: true, user: req.hospital})
    

})


route.post('/api/user/logout',async (req, res) => {

    res.clearCookie('token',{
        httpOnly: true,
        secure: false,
        sameSite:'lax',
        path:'/'
    })

    res.status(200).json({message:'user logout successful'})

})







route.post('/api/login-donor', async (req, res) => {


    try {
        
        const {email, password } = req.body

        if(!email || !password) return;


        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message: 'invalid user try again'})
        
        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch) return res.status(200).json({message: 'unverified'})


        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username,
                bloodType: user.bloodType,
                userType: user.userType,
                location: user.location,
                age: user.age,
                phone: user.phone,
                status: user.status
            },

            process.env.USER_JWT_SECRET,

            {
                expiresIn: '1d'
            }
        )

        
        // cookies for logged in user
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        })

        res.status(200).json({message: 'logged in successfully', userId: user._id, email: user.email, token})

        
    } catch (error) {

        res.status(402).json({error:'err' + error})
    }
    
})







route.post('/api/login-hospital', async(req, res) => {

    try {
        
        const {email, password } = req.body

        if(!email || !password) return;


        const hospital = await Hospital.findOne({email})
        if(!hospital) return res.status(401).json({message: 'invalid hospital try again'})
        
        const isMatch = await bcrypt.compare(password, hospital.password) 
        if(!isMatch) return res.status(200).json({message: 'unverified'})


        const hospitalToken = jwt.sign(
            {
                hospitalId: hospital._id,
                email: hospital.email,
                hospitalname: hospital.username,
                hospitalfullname: hospital.fullname,
                bloodType: hospital.bloodType,
                hospitalType: hospital.userType,
                location: hospital.location,
                age: hospital.age,
                phone: hospital.phone,
                status: hospital.status
            },

            process.env.USER_JWT_SECRET,

            {
                expiresIn: '1d'
            }
        )

        
        // cookies for logged in user
        res.cookie('hospitalToken',hospitalToken,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        })

        res.status(200).json({message: 'logged in successfully', userId: hospital._id, email: hospital.email, hospitalToken})

        
    } catch (error) {

        res.status(402).json({error:'err' + error})
    }
    
})






route.post('/api/donor/logout',async (req, res) => {

    res.clearCookie('token',{
        httpOnly: true,
        secure: false,
        sameSite:'lax',
        path:'/'
    })

    res.status(200).json({message:'donor logout successful'})

})



route.post('/api/hospital/logout', async (req, res) => {

    res.clearCookie('hospitalToken',{
        httpOnly: true,
        secure: false,
        sameSite:'lax',
        path:'/'
    })

    res.status(200).json({message:'hospital logout successful'})

})











export default route

