const jwt=require('jsonwebtoken')

const jwtVerify=(req,res,next)=>{
    const token=req.cookies.access_token    ;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({message:"Forbidden:invalid token"})
    }
}

export default jwtVerify