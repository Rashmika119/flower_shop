import { PhoneCall, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import React from 'react'

function Home() {
  const navigate=useNavigate()
  return (
    <div className='bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 mt-0 py-10 min-h-screen' >
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <div className='absolute top-25 left-40 text-6xl opacity-10 animate-pulse delay-1000'>🌸</div>
      <div className='absolute top-40 right-20 text-4xl opacity-30 animate-bounce delay-500'>🌸</div>
      <div className='absolute bottom-32 left-20 text-3xl opacity-30 animate-bounce delay-1000'>🌸</div>
      <div className='absolute bottom-20 right-20 text-5xl opacity-10 animate-pulse delay-1000'>🌸</div>
    </div>
    <div className='justify-center items-center'>
      <div className='flex backdrop-blur-sm justify-center items-center gap-2 bg-white/70 text-2xl rounded-full border-rose-500/10 px-3 py-3 mx-60 md:mx-90 mt-10 hover:bg-white/80 transition-all duration-300 cursor-pointer group shadow-lg'>
        <span className='text-2xl mr-2 group-hover:scale-110'>🌷</span>
        <span className='text-sm font-medium text-gray-700'> Spring Collection Now Available</span>
      </div>
      <h1 className='text-6xl font-bold text-center mt-10 mb-6 leading-tight'>Fresh Flowers
      <br />
      <span className='bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent'>Every Day</span>
      </h1>
      <p className='text-2xl text-center mx-5 text-gray-600'>Handpicked fresh flowers and timeless artificial arrangements — beauty that lasts or blossoms today.</p>
    </div>
    <div className='flex justify-center items-center gap-10 mt-15'>
      <button className='flex justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 px-5 py-3 text-white font-bold cursor-pointer' onClick={()=>navigate("/allItems")}><ShoppingBag/>Shop Now</button>
      <button className='flex justify-center gap-2 font-bold bg-white/100 border-rose-500/10 hover:bg-white/80 group shadow-lg px-5 py-3 rounded-full text-gray-600 cursor-pointer' onClick={()=>navigate("/contactUs")}><PhoneCall/>Order now</button>

    </div>
    </div>
  )
}

export default Home