import React, { useEffect, useState } from "react";
import CartItem from "../../components/cards/CartItem";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartScreen() {
  const [cartDetails, setCartDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");

    if (cartItems) {
      setCartDetails(JSON.parse(cartItems));
    }
    setIsLoading(false);
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cartDetails.filter((item) => item.id !== itemId);
    setCartDetails(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCartDetails([]);
    localStorage.removeItem("cart");
  };

  const getTotalPrice = () => {
    return cartDetails
      .reduce((total, item) => total + parseFloat(item.price || 0), 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cartDetails.length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg sm:text-xl">🌸</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-2xl sm:text-4xl opacity-40 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-40 right-20 text-xl sm:text-3xl opacity-50 animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-40 left-20 text-lg sm:text-2xl opacity-40 animate-pulse delay-1500">
          🌷
        </div>
        <div className="absolute bottom-20 right-10 text-2xl sm:text-4xl opacity-40 animate-bounce delay-700">
          🌹
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-surface/90 backdrop-blur-sm hover:bg-surface border border-primary/20 hover:border-primary/40 px-3 sm:px-4 py-2 sm:py-3 rounded-full  font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                Your Cart
              </h1>
            </div>

            {cartDetails.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-main/70">
                <p className="text-main text-sm sm:text-base">
                  {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in
                  your cart
                </p>
                <div className="hidden sm:block w-1 h-1 bg-primary/30 rounded-full"></div>
                <p className="text-lg sm:text-xl font-bold text-primary">
                  Total: ${getTotalPrice()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Content */}
        <div className="max-w-4xl mx-auto">
          {cartDetails.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16 sm:py-20">
              <div className="relative group mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-primary/10">
                  <div className="text-4xl sm:text-6xl mb-4 opacity-50">🛒</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                    Your cart is empty
                  </h3>
                  <p className="text-main/70 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">
                    Discover our beautiful flower collection and add some blooms
                    to brighten your day.
                  </p>
                  <button
                    onClick={() => navigate("/allItems")}
                    className="bg-gradient-to-r from-primary via-secondary to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    Browse Flowers
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Cart Items */
            <div className="space-y-4 sm:space-y-6">
              {/* Cart Actions Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10">
                <div className="text-sm sm:text-base text-main/70">
                  Review your selected flowers before checkout
                </div>
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm sm:text-base font-medium transition-colors duration-300 hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3 sm:space-y-4">
                {cartDetails.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${index}`}
                    item={item}
                    onRemove={() => handleRemoveFromCart(item.id)}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <div className="relative group mt-6 sm:mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                        Order Summary
                      </h3>
                      <p className="text-main/70 text-sm sm:text-base">
                        {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}{" "}
                        selected
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm sm:text-base text-main/60 mb-1">
                        Total Amount
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                        ${getTotalPrice()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => navigate("/allItems")}
                      className="flex-1 bg-surface/80 hover:bg-surface border border-primary/30 hover:border-primary/50 text-primary px-6 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Continue Shopping
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 text-white px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                      onClick={() => {
                        alert("Proceeding to checkout...");
                        // Add your checkout logic here
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
