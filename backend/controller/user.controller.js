import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import { signAccessToken, signRefreshToken } from "../util/Token.js";
import Cart from "../models/cart.model.js";
import passport from "../config/passport.js"

export const signUpWithEmailAndPassword=async(req,res)=>{
try {
    const {username,password,email}=req.body;
    const existingUser=await User.findOne({username})
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }
    const cart=new Cart();
    await cart.save();

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({username,password:hashedPassword,email,provider:"EMAIL_PASSWORD",cartId:cart._id});
    await newUser.save();

    const accessToken=signAccessToken(newUser._id);
    const refreshToken=signRefreshToken(newUser._id);

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secret:true,
        sameSite:"lax",
        maxAge:7*24*60*60*1000,
    })
    

    res.status(201).json({
        message:"User created successfully",
        accessToken,
    });
} catch (error) {
    console.log("User creation error "+error);
    res.status(500).json({message:"Internal server error"});
    
}
}

export const loginWithEmailAndPassword=async(req,res)=>{
    try {
        const {password,email}=req.body;
        const confirmUser=await User.findOne({email});
        
        if(!confirmUser){
            return res.status(400).json({message:"Invalid username"});
        }

        const confirmPassword= bcrypt.compare(password,confirmUser.password);

        if(!confirmPassword){
           return res.status(400).json({message:"Invalid password"});   
        }
        const accessToken=signAccessToken(confirmUser._id);
        const refreshToken=signRefreshToken(confirmUser._id);

        res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secret:true,
        sameSite:"lax",
        maxAge:7*24*60*60*1000,
        })

        res.status(200).json({
            accessToken,
            message:"User logged in successfully"
        });
    } catch (error) {
        console.log("User login error "+error);
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

export const refreshAccessToken= (req,res)=>{
     try{
        const userID=req.user._id;
        const newAccessToken=signAccessToken(userID);
        res.status(200).json({accessToken:newAccessToken});


     }catch(error){
        console.log("can't create new accessToken. error: " + error);
        return res.status(401).json({message:"Invalid or expire refresh token"});

     }
}   


export const googleSignIn=passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleSignInCallBack=passport.authenticate("google", {
  failureRedirect: "/api/user/googlesignin/failure",
});

export const handleGoogleLogIn=(req,res)=>{
    try {
    const user = req.user;

    if (!user) {
      res.redirect(`http://localhost:5173/logIn?status=fail`);
    }

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `http://localhost:5173/logIn?status=success&&accessToken=${accessToken}`
    );
  } catch (error) {
    console.log("Google login error: " + error.message);
    res.redirect(`http://localhost:5173/logIn?status=fail`)
  }
}

export const handleGoogleFailure=async(req,res)=>{
     res.redirect(`http://localhost:5173/logIn?status=fail`)
}