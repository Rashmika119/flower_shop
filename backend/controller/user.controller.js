import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, contactNumber, country, address } = req.body;

    // Validate required fields
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    // Validate contact number (optional but if provided, must be valid)
    if (contactNumber && !/^0\d{9}$/.test(contactNumber)) {
      return res.status(400).json({
        message:
          "Invalid contact number. It must be 10 digits and start with 0.",
      });
    }

    const updateData = {
      name: name.trim(),
      contactNumber: contactNumber?.trim() || "",
      country: country?.trim() || "",
      address: address?.trim() || "",
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = req.user.cartId;

    // Find user to ensure they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user's cart first
    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }

    // Delete user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
