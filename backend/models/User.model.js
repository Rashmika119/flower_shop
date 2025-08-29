import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
