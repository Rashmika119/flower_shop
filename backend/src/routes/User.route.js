import express from "express";
import {
  updateUserProfile,
  deleteUserAccount,
} from "../controller/user.controller.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { getUser } from "../middleware/getUser.js";

const userRoute = express.Router();

userRoute.put("/updateProfile", jwtCheck, getUser, updateUserProfile);

userRoute.delete("/deleteAccount", jwtCheck, getUser, deleteUserAccount);

export default userRoute;
