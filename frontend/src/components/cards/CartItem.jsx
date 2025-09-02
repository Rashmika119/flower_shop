import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, Flower2 } from "lucide-react";

function CartItem({ item, onRemove, onQuantityChange }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
  const [newQuantity, setNewQuantity] = useState(item.quantity);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (newQuantity === currentQuantity) {
        return;
      }

      try {
        setIsUpdating(true);
        if (onQuantityChange) {
          await onQuantityChange(newQuantity);
          setCurrentQuantity(newQuantity);
        }
      } catch (error) {
        setNewQuantity(currentQuantity);
        console.error("Error updating quantity:", error);
      } finally {
        setIsUpdating(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [newQuantity]);

  const itemTotal = (parseFloat(item.price || 0) * currentQuantity).toFixed(2);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
      <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Product Image */}
          <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden group/image">
              <img
                src={item.image}
                alt={item.name || "Flower"}
                className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Flower2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-primary truncate">
                    {item.name || "Flower"}
                  </h3>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {item.type && (
                    <p className="text-sm text-main/60">
                      <span className="font-medium">Type:</span> {item.type}
                    </p>
                  )}
                  {item.color && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-main/60 font-medium">
                        Color:
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-primary/20"
                          style={{
                            backgroundColor:
                              item.color?.toLowerCase() || "#pink",
                          }}
                        ></div>
                        <span className="text-sm text-main/70 capitalize">
                          {item.color}
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="text-lg sm:text-xl font-bold text-primary">
                    ${item.price}{" "}
                    <span className="text-sm font-normal text-main/60">
                      each
                    </span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-sm text-main/70 font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1">
                    <button
                      onClick={() => {
                        setNewQuantity((prew) => prew - 1);
                      }}
                      disabled={newQuantity <= 1 || isUpdating}
                      className="w-7 h-7 flex items-center justify-center bg-primary/10 hover:bg-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-md transition-all duration-200 group/btn"
                    >
                      <Minus className="w-3 h-3 text-primary group-disabled/btn:text-gray-400" />
                    </button>
                    <div className="min-w-[2rem] text-center">
                      {isUpdating ? (
                        <div className="w-4 h-4 border-2 border-primary/30 rounded-full animate-spin border-t-primary mx-auto"></div>
                      ) : (
                        <span className="font-bold text-primary">
                          {newQuantity}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setNewQuantity((prew) => prew + 1);
                      }}
                      disabled={isUpdating}
                      className="w-7 h-7 flex items-center justify-center bg-primary/10 hover:bg-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-md transition-all duration-200 group/btn"
                    >
                      <Plus className="w-3 h-3 text-primary group-disabled/btn:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4">
                <div className="text-right">
                  <p className="text-sm text-main/60 mb-1">Total</p>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    ${itemTotal}
                  </p>
                </div>

                <button
                  onClick={() => onRemove && onRemove()}
                  className="flex items-center gap-1 sm:gap-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove</span>
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
