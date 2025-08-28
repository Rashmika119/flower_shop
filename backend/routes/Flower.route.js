import express from 'express';
import { getAllFlowers, getFlowerDetails } from '../controller/flower.controller.js';
import { verifyAccessToken } from '../middleware/Auth.js';

const flowerRoute=express.Router();

flowerRoute.get('/getAllFlowers',getAllFlowers)
flowerRoute.get('/getFlowerDetails/:id',verifyAccessToken, getFlowerDetails)

export default flowerRoute