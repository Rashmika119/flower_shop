import Order from "../models/Order.model.js";
import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";

// Get all orders for a user
export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate({
        path: "flowers.flowerId",
        select: "name price image type description",
      })
      .sort({ purchaseDate: -1 }); // Most recent orders first

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      deliveryDate,
      deliveryTime,
      deliveryLocation,
      Message,
      contactNumber,
      totalAmount,
      flowers,
    } = req.body;

    // Validate required fields
    if (
      !deliveryDate ||
      !deliveryTime ||
      !deliveryLocation ||
      !contactNumber ||
      !totalAmount ||
      !flowers ||
      flowers.length === 0
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Validate delivery date is not in the past
    const selectedDate = new Date(deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Delivery date cannot be in the past",
      });
    }

    // Validate contact number format
    if (!/^0\d{9}$/.test(contactNumber)) {
      return res.status(400).json({
        message:
          "Invalid contact number. It must be 10 digits and start with 0.",
      });
    }

    // Validate flowers array
    for (const flower of flowers) {
      if (!flower.flowerId || !flower.quantity || flower.quantity < 1) {
        return res.status(400).json({
          message:
            "Invalid flower data. Each flower must have a valid ID and quantity.",
        });
      }
    }

    // Create new order
    const newOrder = new Order({
      userId,
      deliveryDate,
      deliveryTime,
      deliveryLocation,
      Message: Message || "",
      contactNumber,
      totalAmount: parseFloat(totalAmount),
      flowers,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    // Populate the saved order with flower details
    const populatedOrder = await Order.findById(savedOrder._id).populate({
      path: "flowers.flowerId",
      select: "name price image type description",
    });

    // Optional: Clear user's cart after successful order
    const user = await User.findById(userId);
    if (user && user.cartId) {
      await Cart.findByIdAndUpdate(user.cartId, {
        $set: { flowers: [] },
      });
    }

    res.status(201).json({
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an order (only if status is Pending)
export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Find the order and verify ownership
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or you don't have permission to delete it",
      });
    }

    // Check if order can be deleted (only pending orders)
    if (order.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot delete order with status: ${order.status}. Only pending orders can be deleted.`,
      });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID format",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findOne({ _id: orderId, userId }).populate({
      path: "flowers.flowerId",
      select: "name price image type description",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or you don't have permission to view it",
      });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID format",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status (for admin use - optional)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Valid statuses are: " + validStatuses.join(", "),
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: "flowers.flowerId",
      select: "name price image type description",
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID format",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
