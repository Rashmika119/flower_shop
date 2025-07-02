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
    useId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }



})
const Cart = mongoose.model('Cart', cartSchema);