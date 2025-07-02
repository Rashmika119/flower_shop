import React from 'react'
import { useNavigate } from 'react-router-dom'



function ItemCard({ item }) {
  const navigate = useNavigate();

  function handleAddToCart() {
    const cart = localStorage.getItem('cart')
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([item]));
      alert("Item added to cart");
      navigate('/cartDetails');
      return
    }
    const cartItems = JSON.parse(cart);
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert("Item added to cart");
    navigate('/cartDetails')

  }

  return (
    <div className='group relative w-72 bg-gradient-to-br m-2  from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] border border-white/20 overflow-hiddengroup  overflow-hidden'>
      <div className='relative rounded-3xl overflow-hidden m-1 group cursor-pointer'>
        <img src={item.image} alt="" onClick={() => { navigate(`/flowerDetails/${item.id}`) }} className='w-full h-44 object-cover transition-all duration-700 group-hover/image:scale-125 group-hover/image:rotate-2' />
      </div>

      <div className='p-2'>
        <h3 className='text-lg font-bold text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-rose-600'>Name:{item.name}</h3>
        <div className='flex gap-2'>
          <p>Flower color:</p>
          <p className='text-gray-700 font-bold'>{item.color}</p>
        </div>
        <div className='flex gap-2'>
          <p>Quantity:</p>
          <div className='w-6 h-6 rounded-full bg-pink-200 text-gray-700 text-sm flex items-center justify-center'>{item.count}</div>
        </div>
        <div className='py-2 flex justify-between items-center'>
          <p className='text-lg font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent'>Price: $ {item.price}</p>
          <button onClick={handleAddToCart} className='relative  flex items-center justify-center bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white px-3 py-1.5 rounded-xl font-bold text-2 transition-all duration-300 hover:scale-100 hover:shadow-xl active:scale-95 overflow-hidden'>Add to Cart</button>
        </div>

      </div>


    </div>
  )
}

export default ItemCard