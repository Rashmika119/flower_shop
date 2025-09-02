import express from "express";
import {
  updateUserProfile,
  deleteUserAccount,
} from "../controller/user.controller.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { getUser } from "../middleware/getUser.js";

const userRoute = express.Router();

// Update user profile
userRoute.put("/updateProfile", jwtCheck, getUser, updateUserProfile);

// Delete user account
userRoute.delete("/deleteAccount", jwtCheck, getUser, deleteUserAccount);

export default userRoute;
