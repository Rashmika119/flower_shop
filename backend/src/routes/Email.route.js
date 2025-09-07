import express from "express";
import { sendEmail } from "../controller/email.controler.js";

const emailRouter = express.Router();

emailRouter.post("/sendemail", sendEmail);

export default emailRouter;
