import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutUs from './screens/AboutUs.screen'
import Home from './screens/Home.screen'
import AllItems from './screens/AllItems.screen'
import ContactUs from './screens/ContactUs.screen'
import Layout from './components/layout'
import FlowerDetails from './screens/FlowerDetails.screen'
import CartScreen from './screens/CartScreen.sreen'

const Nav = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="allItems" element={<AllItems />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="flowerDetails/:id" element={<FlowerDetails />} />
          <Route path="cartDetails" element={<CartScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Nav