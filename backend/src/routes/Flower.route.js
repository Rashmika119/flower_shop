import express from "express";
import {
  getAllFlowers,
  getFlowerDetails,
} from "../controller/flower.controller.js";

const flowerRoute = express.Router();

flowerRoute.get("/getAllFlowers", getAllFlowers);

flowerRoute.get("/getFlowerDetails/:id", getFlowerDetails);

export default flowerRoute;
