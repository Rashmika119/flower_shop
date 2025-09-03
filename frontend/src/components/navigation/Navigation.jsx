import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "../../screens/about/AboutUs.screen";
import Home from "../../screens/home/Home.screen";
import AllItems from "../../screens/allitems/AllItems.screen";
import Layout from "../layout/Layout";
import CartScreen from "../../screens/cart/CartScreen.sreen";
import ContactUs from "../../screens/contact/ContactUs.screen";
import FlowerDetails from "../../screens/flowerdetails/FlowerDetails.screen";
import Profile from "../../screens/profile/Profile";
import Checkout from "../../screens/checkout/Checkout";
import Orders from "../../screens/order/Order";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="allItems" element={<AllItems />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="flowerDetails/:id" element={<FlowerDetails />} />
          <Route path="cartDetails" element={<CartScreen />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
