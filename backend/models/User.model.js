import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        required:true,
            unique:true,
    },
    googleId:{
        type:String
    },
    provider:{
        type:String,
        enum:['EMAIL_PASSWORD','GOOGLE'],
        required:true,
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})

const User= mongoose.model('User',userSchema);
export default User;