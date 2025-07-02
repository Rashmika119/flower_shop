import React from 'react'


function CartItem({item}) {
  return (
    <div>
        <div>
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.price}</p>
            

        </div>
    </div>
  )
}

export default CartItem