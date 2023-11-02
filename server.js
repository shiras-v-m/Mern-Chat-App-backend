const express=require('express')
const chats = require('./data/data')
const userRoutes=require('./routes/userRoutes') 

// To console output more attractive
const colors=require('colors')

// This is important, to  use dotenv file data
const dotenv=require('dotenv')
dotenv.config()

const cors = require('cors');

// import db.js file to connect to MongoDB
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./Middlewares/errorMiddleware')

// connect to mongoDB
connectDB() 
// connectDB should be call below dotenv.config() because we take value from .env file

// creating instance of express
const app=express()

app.use(express.json())

const PORT=process.env.PORT || 4000

app.use(cors());

app.get('/',(req,res)=>{
    res.send("API is running successfully..")
})

// now we get all the chat data from this url "localhost:5000/api/chats"
// app.get('/api/chats',(req,res)=>{
//     res.send(chats)
// })
// app.get('/api/chat/:id',(req,res)=>{
//     const singleChat=chats.find((c)=>c._id === req.params.id )
//     res.send(singleChat)
// })

app.use('/api/user',userRoutes)

app.use(notFound)
app.use(errorHandler)

// using app we are starting our server
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`.yellow.bold);
                                                    // to make the log yellow color and bold text
})