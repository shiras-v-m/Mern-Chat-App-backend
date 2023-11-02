// end points here
const express=require('express')
const { registerUser, authUser,allUsers } = require('../controllers/userControllers')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

// we can write get or post method directly here like, router.get() but if there is multiple end point it is better to use router.route()
router.route('/').post(registerUser).get(protect,allUsers)
// registerUser and get allUsers in single line using route
                        //registerUser is a function from controller
router.post('/login',authUser)

// get all users
// router.route('/').get(allUsers)
            // or we can combine with another 
// router.route('/').post(registerUser).get(allUsers)

module.exports=router
