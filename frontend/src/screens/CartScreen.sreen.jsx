import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem';

function CartScreen() {

    const [cartDetails,setCartDetails]=useState([]);

    useEffect(()=>{
        const cartItems=localStorage.getItem('cart');
       
        if(cartDetails){
            setCartDetails(JSON.parse(cartItems));
        }
        
       
    },[])
  return (
    <div>
        <div>
            <h1>Your Cart</h1>
        </div>
        <div>
            { 
            
                cartDetails.map((item)=>{
                    return <CartItem item={item}/>
                })
            }
        </div>

    </div>
    

  )
}

export default CartScreen