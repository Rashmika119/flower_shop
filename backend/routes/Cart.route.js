import express from 'express';

import { verifyAccessToken } from '../middleware/Auth';
const cartRoute=express.Router();
cartRoute.get('getCartItems',verifyAccessToken,getCartItems);
cartRoute.post('addCartItems/:id',verifyAccessToken,addCartItems);
cartRoute.post('increaseCartItemQuantity/:id',verifyAccessToken,changeCartItemQuantity);
cartRoute.get("getTotalCountOfCartItems",verifyAccessToken,getTotalCountOfCartItems);
cartRoute.delete('removeCartItem/:id',verifyAccessToken,removeCartItem);

export default cartRoute;