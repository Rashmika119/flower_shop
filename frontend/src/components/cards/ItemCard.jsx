import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

function ItemCard({ item }) {
  const navigate = useNavigate();

  function handleAddToCart() {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([item]));
      alert("Item added to cart");
      navigate("/cartDetails");
      return;
    }
    const cartItems = JSON.parse(cart);
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Item added to cart");
    navigate("/cartDetails");
  }

  function handleViewDetails() {
    navigate(`/flowerDetails/${item.id}`);
  }

  return (
    <div className="group relative w-full max-w-sm mx-auto bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20 overflow-hidden">
      {/* Image Container */}
      <div
        className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 group/image cursor-pointer"
        onClick={handleViewDetails}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 sm:h-44 md:h-48 object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-1"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <span className="text-white text-xs font-medium bg-primary/80 px-2 py-1 rounded-full">
              View Details
            </span>
            <Eye className="text-white w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-1 sm:px-2">
        {/* Name */}
        <h3 className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300 line-clamp-2">
          {item.name}
        </h3>

        {/* Details */}
        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-main/60">Color:</span>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary/20 shadow-sm"
                style={{
                  backgroundColor: item.color?.toLowerCase() || "#pink",
                }}
              ></div>
              <span className=" font-medium capitalize">{item.color}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-main/60">Available:</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                {item.count}
              </div>
              <span className="text-main/60 text-xs">in stock</span>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-between sm:block">
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              ${item.price}
            </p>
            <span className="text-xs text-main/50 sm:hidden">per piece</span>
          </div>
        </div>

        <div className="flex gap-2 sm:flex-col lg:flex-row mt-3">
          <button
            onClick={handleViewDetails}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-surface/80 hover:bg-surface border border-primary/30 hover:border-primary/50 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
