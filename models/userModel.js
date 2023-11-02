const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                    //set default pic if user doesnot upload a profile pic                                    
}
},
{
    timeStamps:true
}
)

// compare the password in database with user entered password
userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

//before saving the user data to the database we need to compare the password with encrypted password which is stored on database
userSchema.pre('save',async function (next){
    if(!this.isModified){
        next()
    }
    
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    // using the salt we created the hashed password for the user
  
})

const User=mongoose.model("User",userSchema);
module.exports=User