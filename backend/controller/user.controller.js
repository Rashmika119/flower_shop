import User from "../models/User.model.js";

export const signInUser=async(req,res)=>{
try {
    const {username,password}=req.body;
    const existingUser=await User.findOne({username})
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({username,password:hashedPassword});
    await newUser.save();

    res.status(200).json({message:"User created successfully"});
} catch (error) {
    res.status(500).json({message:"Internal server error"});
    
}
}
export const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const confirmUsername=await User.findOne({username});
        
        if(!confirmUsername){
            return res.status(400).json({message:"Invalid username"});
        }
        const confirmPassword=await bcrypt.compare(password,confirmPassword);

        if(!confirmPassword){
           return res.status(400).json({message:"Invalid password"});   
        }
        res.status(200).json({message:"User logged in successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const getUserById=async(req,res)=>{
    const username=req.param.username;
    try {
       const user=await User.findOne({username})
       if(!user){
        return res.status(404).json({message:"User not found"});
       }
        res.status(200).json({message:"User details",data:user});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        
    }

}