import jwt from 'jsonwebtoken'

async function HospitalAuth(req, res, next) {

    const hospitalToken = req.cookies.hospitalToken

    if(!hospitalToken) return res.status(401).json({authenticated: false})

    try {
        const decoded = jwt.verify(hospitalToken,process.env.USER_JWT_SECRET)

        req.hospital = decoded

        console.log(decoded,'decoded Hospital');
        
        next()

    } catch (error) {

        res.status(500).json({authenticated: false, message:'invalid token'})
        
    }
    
}


export default HospitalAuth