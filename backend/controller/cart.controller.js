import Cart from "../models/cart.model.js";
import Flower from "../models/Flower.model.js";

export const getCartItems = async (req, res) => {
  try {
    const cartId = req.user.cartId;

    const allCartItems = await Cart.findById(cartId).populate({
      path: "flowers.flowerId",
      model: "Flower",
    });

    if (!allCartItems) {
      return res.status(404).json({ message: "cart Items cannot find" });
    }
    const responseCartItems = allCartItems.map((cartItem) => {
      return {
        quantity: cartItem.flowers.quantity,
        itemName: cartItem.flowers.flowerId._id,
        itemImage: cartItem.flowers.flowerId.image,
        itemType: cartItem.flowers.flowerId.type,
        itemPrice: cartItem.flowers.flowerId.price,
      };
    });
    res
      .status(200)
      .json({ message: "get all cart Items", data: responseCartItems });
  } catch (error) {
    console.log("cart items fetching error " + error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const addCartItems = async (req, res) => {
  try {
    const cartId = req.user.cartId;
    const flower = req.body.flowerId;
    const cart = await Cart.findById(cartId);
    const flowerArray = cart.flowers;

    const isFlowerIn = flowerArray.some((f) => f.flowerId === flower);

    if (isFlowerIn) {
      return res.status(500).json({ message: "flower is already exist" });
    }

    flowerArray.push({ flowerId: flower, quantity: 1 });
    await cart.save();
    return res.status(200).json({ message: "Item added to the cart" });
  } catch (error) {
    console.log("cannot add items to the cart", +error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getTotalCountOfCartItems = async (req, res) => {
  try {
    const cartId = req.user.cartId;
    const allCartItems = await Cart.findById(cartId);
    const totalItemsQuantity = allCartItems.length;
    return res
      .status(200)
      .json({ message: "successfully get the total count of cart items" });
  } catch (error) {
    console.log("can not fetch the total cart item count");
    return res
      .status(500)
      .json({ message: "cannot fetch the total count of cart items" });
  }
};

export const changeCartItemQuantity = async (req, res) => {
  try {
    const { flowerId, quantity } = req.body;
    const cartId = req.user.cartId;

    const flower = await Flower.findById(flowerId);
    const flowerCount = flower.length;

    const cart = await Cart.find({ _id: cartId, "flowers.flowerId": flowerId });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    if (flowerCount < quantity || quantity < 0) {
      return res
        .status(500)
        .json({ message: "the flower count is not in valid range" });
    }
    const response = await Cart.findOneAndUpdate(
      { _id: cartId, "flowers.flowerId": flowerId },
      { $set: { "flowers.$.quantity": quantity } }
    );
    res.status(200).json({ message: "Item quantity changed successfully" });
  } catch (error) {
    console.log("the item quantity can't change " + error);
    res.status(500).json({ message: "the qunatity of the cart can't change" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const flowerId = req.body.flowerId;
    const cartId = req.user.cartID;

    const flower = await Cart.find({
      _id: cartId,
      "flowers.flowerId": flowerId,
    });

    if (!flower) {
      return res.status(404).json({ message: "flower not found" });
    }

    await flower.update({ $pull: { "flowers.flowerId": flowerId } });

    res
      .status(200)
      .json({ message: "item delete from the cart is successfully." });
  } catch (error) {
    console.error("Error in delete item from the cart:", error);
    res.status(500).json({ message: "Error in delete item from the cart." });
  }
};
