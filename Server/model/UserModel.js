const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: 3,
        max: 20,
        unqiue:true,
    },
    email:{
        type:String,
        required: true,
        max: 50,
        unqiue:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:""
    }
})

module.exports=mongoose.model("Users",userSchema)