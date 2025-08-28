import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    flowers: [{
        flowerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flower'
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],
})
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;