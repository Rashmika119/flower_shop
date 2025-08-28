import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB  from './config/database.js';
import flowerRoute from './routes/flower.route.js';
import Flower from './models/Flower.model.js';
import userRoute from './routes/User.route.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import session from "express-session";
import cartRoute from './routes/Cart.route.js';

const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());//use as middleware to parse cookie to the frontend

app.use(
  session({
    secret: "throwaway-passport-bridge",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
    },
  })
);


//backend can access from any URl
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // This is the key setting
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/api/flowers",flowerRoute)
app.use("/api/user",userRoute)
app.use("/api/cart",cartRoute)
//port connction 
app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`)
})






