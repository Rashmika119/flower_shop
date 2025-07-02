import Flower from "../models/Flower.model.js";

export const getAllFlowers=async(req,res)=>{
    try{
       const allFlowers= await Flower.find({})
       if(!allFlowers){
        return res.status(404).json({message:"Flowers not found"});
       }
       const responseFlowers= allFlowers.map((flower)=>{
        return {
            id:flower._id,
            name:flower.name,
            color:flower.color,
            price:flower.price,
            image:flower.image,
            count:flower.count,
        }
       })
        res.status(200).json({message:"get all flowers", data:responseFlowers});


    }
    catch(error){
        console.log("Get all flowers fetching error "+error);
        res.status(500).json({message:"Internal server error"});

    }

}
export const getFlowerDetails=async(req,res)=>{
    try {
        const flowerId=req.params.id;
        console.log(flowerId);
        const flowerDetail=await Flower.findById(flowerId);
        if(!flowerDetail){
            return res.status(404).json({message:"Flower details not found"});
        }
        const responseDetails={
            id:flowerDetail._id,
            name:flowerDetail.name,
            description:flowerDetail.description,
            type:flowerDetail.type,
            color:flowerDetail.color,
            price:flowerDetail.price,
            image:flowerDetail.image,
            count:flowerDetail.count,


        }
        res.status(200).json({message:"get flower deatils",data:responseDetails})

        
    } catch (error) {
        console.log("Get flower details fetching error "+error);
        res.status(500).json({message:"Get flower details Fetching error"});
        
    }

}
