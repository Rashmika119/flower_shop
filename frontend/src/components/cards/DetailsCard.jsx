import React, { useState } from "react";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Info,
  Flower2,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JWTAxios } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { increaseCountByOne } from "../../state/cart/cartSlice";

function DetailsCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);

      const response = await JWTAxios.post("/cart/addCartItems", {
        flowerId: item.id,
      });

      if (response.status === 200) {
        toast.success("Item added to cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        dispatch(increaseCountByOne());
        navigate("/cartDetails");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isOutOfStock = !item.count || item.count === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
      {/* Image Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10 overflow-hidden">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={item.image}
              alt={item.name || "Flower"}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-all duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image overlay with price */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <div className="bg-surface/95 backdrop-blur-md rounded-xl border border-primary/20 p-3 sm:p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    ${item.price}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-main/60 font-medium">
                  per piece
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Main Info Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-primary hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
                Flower Information
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Name */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">
                    N
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-main/60 font-medium mb-1">
                    Flower Name
                  </p>
                  <p className="text-base sm:text-lg text-primary font-bold">
                    {item.name || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Color */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-primary/20">
                  <div
                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-sm"
                    style={{
                      backgroundColor: item.color?.toLowerCase() || "#pink",
                    }}
                  ></div>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-main/60 font-medium mb-1">
                    Color
                  </p>
                  <p className="text-base sm:text-lg font-bold text-primary capitalize">
                    {item.color || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-accent/5 rounded-xl border border-accent/10">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">
                    T
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-main/60 font-medium mb-1">
                    Type
                  </p>
                  <p className="text-base sm:text-lg font-bold text-primary">
                    {item.type || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-main/60 font-medium mb-1">
                    Available Quantity
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-base sm:text-lg font-bold text-primary">
                      {item.count || 0}
                    </p>
                    <span
                      className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                        isOutOfStock
                          ? "text-red-500 bg-red-50"
                          : "text-main bg-surface"
                      }`}
                    >
                      {isOutOfStock ? "out of stock" : "in stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        {item.description && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Info className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                <h3 className="text-lg sm:text-xl font-bold text-primary">
                  Description
                </h3>
              </div>
              <p className="text-main/70 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          </div>
        )}

        {/* Quantity Selector & Action Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-primary/30 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">
                Ready to Purchase?
              </h3>
              <p className="text-main/70 mb-4 sm:mb-6 text-sm sm:text-base">
                Add this beautiful flower to your cart and make your special
                occasion bloom with elegance.
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                className="w-full sm:w-auto bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2 min-w-[200px] mx-auto"
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>
                      {isOutOfStock
                        ? "Out of Stock"
                        : `Add ${quantity} to Cart`}
                    </span>
                  </>
                )}
              </button>

              {isOutOfStock && (
                <p className="text-xs sm:text-sm text-red-500 mt-2 font-medium">
                  This item is currently unavailable
                </p>
              )}

              {!isOutOfStock && (
                <p className="text-xs sm:text-sm text-main/60 mt-2">
                  Total: ${(parseFloat(item.price) * quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
