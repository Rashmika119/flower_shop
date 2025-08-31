import { PhoneCall, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background mt-0 py-6 sm:py-10 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-16 sm:top-25 left-10 sm:left-40 text-3xl sm:text-6xl opacity-10 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-20 text-2xl sm:text-4xl opacity-30 animate-bounce delay-500">
          🌸
        </div>
        <div className="absolute bottom-20 sm:bottom-32 left-5 sm:left-20 text-xl sm:text-3xl opacity-30 animate-bounce delay-1000">
          🌸
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 text-3xl sm:text-5xl opacity-10 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-1/2 left-1/4 text-2xl sm:text-4xl opacity-20 animate-pulse delay-700 hidden sm:block">
          🌸
        </div>
        <div className="absolute top-3/4 right-1/3 text-xl sm:text-3xl opacity-20 animate-bounce delay-1500 hidden md:block">
          🌸
        </div>
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center px-4 sm:px-6">
        <div className="flex backdrop-blur-sm justify-center items-center gap-2 bg-surface text-base sm:text-2xl rounded-full border border-primary/20 px-4 sm:px-6 py-2 sm:py-3 mx-4 sm:mx-20 lg:mx-60 mt-6 sm:mt-10 hover:bg-surface/90 hover:shadow-lg transition-all duration-300 cursor-pointer group shadow-md max-w-lg w-full">
          <span className="text-lg sm:text-2xl mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-300">
            🌷
          </span>
          <span className="text-xs sm:text-sm font-medium text-main whitespace-nowrap">
            Spring Collection Now Available
          </span>
        </div>

        <div className="text-center mt-8 sm:mt-10 mb-4 sm:mb-6 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-main">
            Fresh Flowers
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Every Day
            </span>
          </h1>
        </div>

        <div className="px-4 sm:px-6 max-w-4xl">
          <p className="text-base sm:text-xl lg:text-2xl text-center text-main/80 leading-relaxed">
            Handpicked fresh flowers and timeless artificial arrangements —
            beauty that lasts or blossoms today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-10 mt-8 sm:mt-12 lg:mt-15 px-4 w-full max-w-md sm:max-w-none">
          <button
            className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary px-6 sm:px-8 py-3 sm:py-4 text-white font-bold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group min-w-[140px]"
            onClick={() => navigate("/allItems")}
          >
            <ShoppingBag
              className="group-hover:scale-110 transition-transform duration-300"
              size={18}
            />
            <span>Shop Now</span>
          </button>

          <button
            className="w-full sm:w-auto flex justify-center items-center gap-2 font-bold bg-surface hover:bg-surface/80 border border-primary/20 hover:border-primary/40 group shadow-md hover:shadow-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full text-main cursor-pointer transition-all duration-300 hover:scale-105 min-w-[140px]"
            onClick={() => navigate("/contactUs")}
          >
            <PhoneCall
              className="group-hover:scale-110 transition-transform duration-300"
              size={18}
            />
            <span>Order Now</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4 max-w-6xl w-full">
          <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              🌹
            </div>
            <h3 className="font-bold text-main text-lg sm:text-xl mb-2">
              Fresh Daily
            </h3>
            <p className="text-main/70 text-sm sm:text-base">
              Hand-picked flowers delivered fresh every morning
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              🎨
            </div>
            <h3 className="font-bold text-main text-lg sm:text-xl mb-2">
              Custom Arrangements
            </h3>
            <p className="text-main/70 text-sm sm:text-base">
              Personalized bouquets for every special occasion
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              🚚
            </div>
            <h3 className="font-bold text-main text-lg sm:text-xl mb-2">
              Fast Delivery
            </h3>
            <p className="text-main/70 text-sm sm:text-base">
              Same-day delivery available in Negombo area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
