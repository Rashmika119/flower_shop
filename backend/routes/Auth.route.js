import express from "express";
import { login } from "../controller/auth.controller.js";
import jwtCheck from "../middleware/JwtCheck.js";

const authRouter = express.Router();

authRouter.post("/login", jwtCheck, login);

export default authRouter;
