import express from "express";
import {
  addCartItems,
  changeCartItemQuantity,
  getCartItems,
  getTotalCountOfCartItems,
  removeCartItem,
} from "../controller/cart.controller.js";

const cartRoute = express.Router();

cartRoute.get("getCartItems", getCartItems);

cartRoute.post("addCartItems/:id", addCartItems);

cartRoute.post("increaseCartItemQuantity/:id", changeCartItemQuantity);

cartRoute.get("getTotalCountOfCartItems", getTotalCountOfCartItems);

cartRoute.delete("removeCartItem/:id", removeCartItem);

export default cartRoute;
