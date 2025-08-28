import express from 'express';
import { getUserById, googleSignIn, googleSignInCallBack, handleGoogleFailure, handleGoogleLogIn, loginWithEmailAndPassword, refreshAccessToken, signUpWithEmailAndPassword } from '../controller/user.controller.js';
import { verifyRefreshToken } from '../middleware/Auth.js';

const userRoute=express.Router();

userRoute.post('/signUpUser',signUpWithEmailAndPassword)
userRoute.post('/loginUser',loginWithEmailAndPassword)
userRoute.get('/getUserById/:username',getUserById)
userRoute.post('/newAccessToken',verifyRefreshToken,refreshAccessToken)
userRoute.get('/googleLogIn',googleSignIn)
userRoute.get('/googlecallback',googleSignInCallBack,handleGoogleLogIn)
userRoute.get('/handleGoogleLogInFailure',handleGoogleFailure);

export default userRoute;