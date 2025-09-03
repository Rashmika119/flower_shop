import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Package,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Trash2,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { JWTAxios } from "../../config/axiosConfig";

const Orders = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLogedIn);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn, navigate]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await JWTAxios.get("/order/getAllOrders");

      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeletingOrderId(orderId);
      const response = await JWTAxios.delete(`/order/deleteOrder/${orderId}`);

      if (response.status === 200) {
        setOrders(orders.filter((order) => order._id !== orderId));
        toast.success("Order deleted successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.response?.data?.message || "Failed to delete order", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setDeletingOrderId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Shipped":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTotalItems = (flowers) => {
    return flowers.reduce((total, flower) => total + flower.quantity, 0);
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
              className="flex items-center gap-2 bg-surface/90 backdrop-blur-sm hover:bg-surface border border-primary/20 hover:border-primary/40 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Package className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                My Orders
              </h1>
            </div>
            <p className="text-main/70 text-sm sm:text-base">
              Track and manage your flower orders
            </p>
          </div>
        </div>

        {/* Orders Content */}
        <div className="max-w-4xl mx-auto">
          {orders.length === 0 ? (
            /* Empty Orders State */
            <div className="text-center py-16 sm:py-20">
              <div className="relative group mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-primary/10">
                  <div className="text-4xl sm:text-6xl mb-4 opacity-50">📦</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                    No orders yet
                  </h3>
                  <p className="text-main/70 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">
                    You haven't placed any orders yet. Start shopping to see
                    your orders here.
                  </p>
                  <button
                    onClick={() => navigate("/allItems")}
                    className="bg-gradient-to-r from-primary via-secondary to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Orders List */
            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-primary">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-main/60 text-sm">
                          Placed on {formatDate(order.purchaseDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            disabled={deletingOrderId === order._id}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-300 hover:scale-105 disabled:opacity-50"
                          >
                            {deletingOrderId === order._id ? (
                              <div className="w-4 h-4 border-2 border-red-500/20 rounded-full animate-spin border-t-red-500"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Delivery Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-main">
                          Delivery Details
                        </h4>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-main/70">Date:</span>
                            <span className="font-medium text-main">
                              {formatDate(order.deliveryDate)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-main/70">Time:</span>
                            <span className="font-medium text-main">
                              {order.deliveryTime}
                            </span>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-primary mt-0.5" />
                            <span className="text-main/70">Location:</span>
                            <span className="font-medium text-main">
                              {order.deliveryLocation}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="text-main/70">Contact:</span>
                            <span className="font-medium text-main">
                              {order.contactNumber}
                            </span>
                          </div>

                          {order.Message && (
                            <div className="flex items-start gap-3">
                              <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                              <span className="text-main/70">Message:</span>
                              <span className="font-medium text-main">
                                {order.Message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-main">Order Items</h4>

                        <div className="space-y-3">
                          {order.flowers.map((flower, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-surface/50 rounded-lg border border-primary/10"
                            >
                              <img
                                src={
                                  flower.flowerId?.image ||
                                  "/placeholder-flower.jpg"
                                }
                                alt={flower.flowerId?.name || "Flower"}
                                className="w-10 h-10 object-cover rounded-md border border-primary/20"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-main text-sm truncate">
                                  {flower.flowerId?.name || "Unknown Flower"}
                                </p>
                                <p className="text-main/60 text-xs">
                                  Qty: {flower.quantity} × $
                                  {flower.flowerId?.price || "0.00"}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary text-sm">
                                  $
                                  {(
                                    (flower.flowerId?.price || 0) *
                                    flower.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-primary/20 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-main/70 text-sm">
                              Total Items: {getTotalItems(order.flowers)}
                            </span>
                            <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
