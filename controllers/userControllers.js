const asyncHandler=require('express-async-handler')
const User=require('../models/userModel');
const generateToken = require('../config/generateToken');
const registerUser= asyncHandler( async(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }

    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const user=await User.create({
        name,email,password,pic
    })
    if(user){
        //status 201 - request has succeeded and has led to the creation of a resource
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
            throw new Error("user creation failed")
    }
})


const authUser= asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    
    const user= await User.findOne({email})
    if(!user){
        res.status(401)
        throw new Error("User doesn't exist!")
    }
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
            throw new Error("Incorrect username or password")
    }
} )

// IMPORTANT
// instead of sending request data as post we can use get method and send data as query 
    // eg: /api/user/search=shiras
const allUsers=asyncHandler( async (req,res)=>{
    
   
    const keyword=req.query.search
             ? {
        $or: [
            {name: {$regex:req.query.search, $options:"i"}},
            {email: {$regex:req.query.search,$options:"i"}}
        ]
    }: {}

    const users=await User.find(keyword).find({_id:{$ne:req.user._id}})

    // get all user which is not the logged in user (avoid it by using user._id
    res.send(users)
})

module.exports={registerUser,authUser,allUsers}