import React from 'react'

function DetailsCard({item}) {

  return (
    <div>
        <img src={item.image} alt="" />
        <p>Flower name: {item.name}</p>
        <p>Flower color: {item.color}</p>
        <p>Flower type: {item.type}</p>
        <p>Flower description: {item.description}</p>
        <p>Flower price: {item.price}</p>
        <p>Flower quantity: {item.count}</p>
    </div>
  )
}

export default DetailsCard