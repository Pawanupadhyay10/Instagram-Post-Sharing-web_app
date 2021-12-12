const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passward:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dnvtlgaf6/image/upload/v1609263625/blank-profile-picture-973460_1280_an4pwc.png"
       },
    resetToken:String,
    expireToken:Date,
    resetEmailToken:String,
    expireEmailToken:Date,
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    date: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("User",userSchema)