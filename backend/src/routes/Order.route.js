import express from "express";
import {
  getAllOrders,
  createOrder,
  deleteOrder,
} from "../controller/order.controler.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { getUser } from "../middleware/getUser.js";

const orderRoute = express.Router();

orderRoute.get("/getAllOrders", jwtCheck, getUser, getAllOrders);

orderRoute.post("/createOrder", jwtCheck, getUser, createOrder);

orderRoute.delete("/deleteOrder/:orderId", jwtCheck, getUser, deleteOrder);

export default orderRoute;
