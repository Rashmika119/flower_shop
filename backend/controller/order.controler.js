import Order from "../models/Order.model.js";
import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate({
        path: "flowers.flowerId",
        select: "name price image type description",
      })
      .sort({ purchaseDate: -1 });

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

    const selectedDate = new Date(deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Delivery date cannot be in the past",
      });
    }

    if (!/^0\d{9}$/.test(contactNumber)) {
      return res.status(400).json({
        message:
          "Invalid contact number. It must be 10 digits and start with 0.",
      });
    }

    for (const flower of flowers) {
      if (!flower.flowerId || !flower.quantity || flower.quantity < 1) {
        return res.status(400).json({
          message:
            "Invalid flower data. Each flower must have a valid ID and quantity.",
        });
      }
    }

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

    const populatedOrder = await Order.findById(savedOrder._id).populate({
      path: "flowers.flowerId",
      select: "name price image type description",
    });

    const user = await User.findById(userId);
    if (user && user.cartId) {
      await Cart.findByIdAndUpdate(user.cartId, {
        $set: { flowers: [] },
      });
    }

    res.status(201).json({
      message: "Order created successfully",
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

export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or you don't have permission to delete it",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot delete order with status: ${order.status}. Only pending orders can be deleted.`,
      });
    }

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
