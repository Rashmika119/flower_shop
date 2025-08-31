import React, { useState } from "react";
import { Trash2, Eye, Plus, Minus, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartItem({ item, onRemove }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(
      1,
      Math.min(item.count || 1, quantity + change)
    );
    setQuantity(newQuantity);
  };

  const handleViewDetails = () => {
    navigate(`/flowerDetails/${item.id}`);
  };

  const getItemTotal = () => {
    return (parseFloat(item.price || 0) * quantity).toFixed(2);
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

      <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10 hover:border-primary/20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Image Section */}
          <div
            className="relative flex-shrink-0 w-full sm:w-32 md:w-40 cursor-pointer group/image"
            onClick={handleViewDetails}
          >
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name || "Flower"}
                className="w-full h-32 sm:h-32 md:h-40 object-cover transition-all duration-700 group-hover/image:scale-110"
              />
            </div>

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-300 rounded-xl sm:rounded-2xl">
              <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                <span className="text-white text-xs font-medium bg-primary/80 px-2 py-1 rounded-full flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View Details
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            {/* Item Info */}
            <div>
              <h3
                className="text-lg sm:text-xl font-bold text-primary mb-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300 cursor-pointer line-clamp-2"
                onClick={handleViewDetails}
              >
                {item.name || "Unnamed Flower"}
              </h3>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                {/* Color */}
                <div className="flex items-center gap-2">
                  <span className="text-main/60">Color:</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary/20 shadow-sm"
                      style={{
                        backgroundColor: item.color?.toLowerCase() || "#pink",
                      }}
                    ></div>
                    <span className="text-main font-medium capitalize">
                      {item.color || "Not specified"}
                    </span>
                  </div>
                </div>

                {/* Type */}
                {item.type && (
                  <div className="flex items-center gap-2">
                    <span className="text-main/60">Type:</span>
                    <span className="text-main font-medium">{item.type}</span>
                  </div>
                )}

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 text-main/60" />
                  <span className="text-main/60">
                    {item.count || 0} available
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity and Price Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-main/60 font-medium">
                  Quantity:
                </span>
                <div className="flex items-center gap-2 bg-primary/5 rounded-lg border border-primary/20 p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-8 text-center font-bold text-primary">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (item.count || 1)}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-main/60">
                    ${item.price} × {quantity}
                  </p>
                  <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    ${getItemTotal()}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={onRemove}
                  className="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-300 hover:scale-110 active:scale-95 group/remove"
                >
                  <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
