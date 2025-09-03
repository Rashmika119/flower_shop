import express from "express";
import {
  getAllOrders,
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrderStatus,
} from "../controller/order.controler.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { getUser } from "../middleware/getUser.js";

const orderRoute = express.Router();

// Get all orders for authenticated user
orderRoute.get("/getAllOrders", jwtCheck, getUser, getAllOrders);

// Create a new order
orderRoute.post("/createOrder", jwtCheck, getUser, createOrder);

// Get a single order by ID
orderRoute.get("/getOrder/:orderId", jwtCheck, getUser, getOrderById);

// Delete an order (only pending orders)
orderRoute.delete("/deleteOrder/:orderId", jwtCheck, getUser, deleteOrder);

// Update order status (for admin use - optional)
orderRoute.patch(
  "/updateStatus/:orderId",
  jwtCheck,
  getUser,
  updateOrderStatus
);

export default orderRoute;
