const jwt=require('jsonwebtoken')

const generateToken = (id)=>{ //id or token get from the user
    return jwt.sign({id},process.env.JWT_SECRET,{
        // 3rd argument expiry time
        expiresIn:"30d"
    })
}

module.exports=generateToken