import express from "express";
import {
  addCartItems,
  changeCartItemQuantity,
  getCartItems,
  getTotalCountOfCartItems,
  removeCartItem,
} from "../controller/cart.controller.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { getUser } from "../middleware/getUser.js";

const cartRoute = express.Router();

cartRoute.get("/getCartItems", jwtCheck, getUser, getCartItems);

cartRoute.post("/addCartItems", jwtCheck, getUser, addCartItems);

cartRoute.post(
  "/increaseCartItemQuantity",
  jwtCheck,
  getUser,
  changeCartItemQuantity
);

cartRoute.get(
  "/getTotalCountOfCartItems",
  jwtCheck,
  getUser,
  getTotalCountOfCartItems
);

cartRoute.delete("/removeCartItem/:id", jwtCheck, getUser, removeCartItem);

export default cartRoute;
