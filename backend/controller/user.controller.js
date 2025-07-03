import User from "../models/User.model.js";

export const signInUser=async(req,res)=>{
try {
    const {username,password}=req.body;
    const existingUser=await User.findOne({username})
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }
    const newUser=new User({username,password});
    await newUser.save();

    res.status(200).json({message:"User created successfully"});
} catch (error) {
    res.status(500).json({message:"Internal server error"});
    
}
}