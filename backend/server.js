import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB  from './config/database.js';
import flowerRoute from './routes/flower.route.js';
import Flower from './models/Flower.model.js';
import userRoute from './routes/User.route.js';

const app = express();
const PORT = 3000;

//backend can access from any URl
app.use(cors({origin:"*"}));


app.use("/api/flowers",flowerRoute)
app.use("/api/user",userRoute)
//port connction 
app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`)
})






