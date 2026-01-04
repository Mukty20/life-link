import jwt from 'jsonwebtoken'

async function userAuth(req, res, next) {

    const token = req.cookies.token

    if(!token) return res.status(401).json({authenticated: false})

    try {
        const decoded = jwt.verify(token,process.env.USER_JWT_SECRET)

        req.user = decoded

        console.log(decoded,'decoded user');
        
        next()

    } catch (error) {

        res.status(500).json({authenticated: false, message:'invalid token'})
        
    }
    
}


export default userAuth