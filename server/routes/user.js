import express from 'express'
const route = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.js'
import userAuth from '../auth/userAuth.js'







route.patch('/api/profile', userAuth, async(req, res) => {

    const { bloodType, location, status } = req.body;

    try {

        let user = await User.findByIdAndUpdate(req.user.userId,{
            bloodType,
            location,
            status
        },
        {new: true}
        )
        

        res.status(200).json({data: user, successful: true, message:'profile update was successful' })

    } catch (error) {

        res.status(500).json({successful: false, message:'profile update failed'})
    }
})







export default route


