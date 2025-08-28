import React, { useEffect, useState } from 'react'
import DetailsCard from '../components/DetailsCard';
import { useParams } from 'react-router-dom';
import useAxios, { JWTAxios } from '../config/axiosConfig';

function FlowerDetails() {
    const id=useParams().id;
    console.log("id"+id);
    const[flowerDetails,setFlowerDetails]=useState({});

    useEffect(()=>{
            const fetchFlowerDetails=async()=>{
                
                try {
                    const response=await JWTAxios.get(`/flowers/getFlowerDetails/${id}`);
                    if(response.status==200){
                        setFlowerDetails(response.data.data);
                    }else{
                        alert(response.data.message);
                    }
                    
                } catch (error) {
                    console.log("Error of getting data "+error);
                    alert("Error of getting data");
                    
                }
            }
            fetchFlowerDetails();
       

    },[id])

  return (
    <div>
        <div>
            <h1>{flowerDetails.name +" Details"} </h1>
        </div>
        <div>
            <DetailsCard item={flowerDetails}/>
        </div>


    </div>
    

  )
}

export default FlowerDetails