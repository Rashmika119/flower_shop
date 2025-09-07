import mongoose from "mongoose";

const flowerSchema=new mongoose.Schema({
    name:{
        type:String,
        reguired:true,
    },
    color:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    }

})

const Flower=mongoose.model('Flower',flowerSchema)
export default Flower