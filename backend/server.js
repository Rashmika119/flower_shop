import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import flowerRoute from "./routes/flower.route.js";
import userRoute from "./routes/User.route.js";
import dotenv from "dotenv";
import cartRoute from "./routes/Cart.route.js";
import startHTTPSServer from "./config/HttpsServer.js";
import authRouter from "./routes/Auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

//backend can access from any URl
app.use(
  cors({
    origin: "https://localhost:5173", // Your frontend URL
    credentials: true, // This is the key setting
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/flowers", flowerRoute);

app.use("/api/user", userRoute);

app.use("/api/cart", cartRoute);

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

//using https library express app run with https
startHTTPSServer(app, PORT, connectDB);
