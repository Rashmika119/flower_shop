import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingBag,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Mail,
  CreditCard,
  Package,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { JWTAxios } from "../../config/axiosConfig";
import { removeDatafromCart, resetCartCount } from "../../state/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const cartDetails = useSelector((state) => state.cart.data);
  const isLoggedIn = useSelector((state) => state.user.isLogedIn);

  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
    message: "",
    contactNumber: "",
  });

  // Calculate total amount
  const totalAmount = cartDetails.reduce((sum, item) => {
    return sum + parseFloat(item.itemPrice || 0) * (item.quantity || 1);
  }, 0);

  const getTotalItems = () => {
    return cartDetails.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    } else {
      if (cartDetails.length === 0) {
        navigate("/");
        return;
      }
    }

    if (userData) {
      setOrderData({
        deliveryDate: "",
        deliveryTime: "",
        deliveryLocation: userData.address || "",
        message: "",
        contactNumber: userData.contactNumber || "",
      });
    }
  }, [userData, isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "deliveryDate") {
      const selectedDate = new Date(value);
      const day = selectedDate.getDay();

      if (day === 0) {
        toast.error("Delivery is not available on Sundays", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        return;
      }
    }

    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!orderData.deliveryDate) {
      toast.error("Please select a delivery date", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (!orderData.deliveryTime) {
      toast.error("Please select a delivery time", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (!orderData.deliveryLocation.trim()) {
      toast.error("Please enter a delivery location", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (!orderData.contactNumber.trim()) {
      toast.error("Please enter a contact number", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(orderData.deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Delivery date cannot be in the past", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Prepare order data
      const orderPayload = {
        deliveryDate: orderData.deliveryDate,
        deliveryTime: orderData.deliveryTime,
        deliveryLocation: orderData.deliveryLocation,
        Message: orderData.message,
        contactNumber: orderData.contactNumber,
        totalAmount: totalAmount.toFixed(2),
        flowers: cartDetails.map((item) => ({
          flowerId: item.id,
          quantity: item.quantity || 1,
        })),
      };

      const response = await JWTAxios.post("/order/createOrder", orderPayload);

      if (response.status === 200 || response.status === 201) {
        dispatch(removeDatafromCart());
        dispatch(resetCartCount());

        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });

        navigate("/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

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
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 bg-surface/90 backdrop-blur-sm hover:bg-surface border border-primary/20 hover:border-primary/40 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Back to Cart</span>
            </button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                Checkout
              </h1>
            </div>
            <p className="text-main/70 text-sm sm:text-base">
              Complete your order and get your beautiful flowers delivered
            </p>
          </div>
        </div>

        {/* Checkout Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Order Details Form */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h3 className="text-lg sm:text-xl font-bold text-primary">
                      Customer Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-main/70 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <div className="w-full px-4 py-3 bg-surface/30 border border-primary/10 rounded-xl text-main/60 cursor-not-allowed">
                        {userData?.name || "Not provided"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-main/70 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <div className="w-full px-4 py-3 bg-surface/30 border border-primary/10 rounded-xl text-main/60 cursor-not-allowed">
                        {userData?.email || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-primary" />
                    <h3 className="text-lg sm:text-xl font-bold text-primary">
                      Delivery Details
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-main/70 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Delivery Date *
                        </label>
                        <input
                          type="date"
                          name="deliveryDate"
                          value={orderData.deliveryDate}
                          onChange={handleInputChange}
                          min={getTomorrowDate()}
                          className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-main/70 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Delivery Time *
                        </label>
                        <select
                          name="deliveryTime"
                          value={orderData.deliveryTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300"
                          required
                        >
                          <option value="">Select time</option>
                          <option value="9:00 AM - 12:00 PM">
                            9:00 AM - 12:00 PM
                          </option>
                          <option value="12:00 PM - 3:00 PM">
                            12:00 PM - 3:00 PM
                          </option>
                          <option value="3:00 PM - 6:00 PM">
                            3:00 PM - 6:00 PM
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-main/70 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Delivery Location *
                      </label>
                      <textarea
                        name="deliveryLocation"
                        value={orderData.deliveryLocation}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 resize-none"
                        placeholder="Enter complete delivery address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-main/70 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={orderData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300"
                        placeholder="07xxxxxxxx"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-main/70 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Special Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={orderData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 resize-none"
                        placeholder="Any special instructions or message for the recipient..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Cart Items Summary */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <h3 className="text-lg sm:text-xl font-bold text-primary">
                      Order Summary
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    {cartDetails.map((item, index) => (
                      <div
                        key={`${item.itemName}-${index}`}
                        className="flex items-center gap-4 p-3 bg-surface/50 rounded-xl border border-primary/10"
                      >
                        <img
                          src={item.itemImage}
                          alt={item.itemName}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-main text-sm sm:text-base truncate">
                            {item.itemName}
                          </h4>
                          <p className="text-main/60 text-xs sm:text-sm">
                            {item.itemType}
                          </p>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-main/70">
                            <span>Qty: {item.quantity || 1}</span>
                            <span>•</span>
                            <span className="font-medium text-primary">
                              ${item.itemPrice}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-sm sm:text-base">
                            $
                            {(
                              (item.itemPrice || 0) * (item.quantity || 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-main/70">Total Items:</span>
                      <span className="font-medium text-main">
                        {getTotalItems()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-main">
                        Total Amount:
                      </span>
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 text-white px-6 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/20 rounded-full animate-spin border-t-white"></div>
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      {isLoading ? "Placing Order..." : "Place Order"}
                    </button>

                    <p className="text-center text-xs text-main/50 mt-4">
                      By placing this order, you agree to our terms and
                      conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
