import express from 'express';
import { getUserById, loginUser, signInUser } from '../controller/user.controller.js';

const userRoute=express.Router();

userRoute.post('/signInUser',signInUser)
userRoute.post('/loginUser',loginUser)
userRoute.get('/getUserById/:username',getUserById)

export default userRoute;