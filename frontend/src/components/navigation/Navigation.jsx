import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "../../screens/about/AboutUs.screen";
import Home from "../../screens/home/Home.screen";
import AllItems from "../../screens/allitems/AllItems.screen";
import Layout from "../layout/Layout";
import CartScreen from "../../screens/cart/CartScreen.sreen";
import ContactUs from "../../screens/contact/ContactUs.screen";
import FlowerDetails from "../../screens/flowerdetails/FlowerDetails.screen";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
