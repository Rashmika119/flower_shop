import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import DarkmoodToggler from "../darkmoodtogler/DarkmodeTogler";
import { useDispatch, useSelector } from "react-redux";
import { JWTAxios } from "../../config/axiosConfig";
import {
  increaseCountByAmount,
  resetCartCount,
} from "../../state/cart/cartSlice";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, logout } = useAuth0();
  const islogin = useSelector((state) => state.user.isLogedIn);
  const cartCount = useSelector((state) => state.cart.itemCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const responce = await JWTAxios.get("/cart/getTotalCountOfCartItems");

        if (responce.status === 200) {
          dispatch(resetCartCount());
          dispatch(increaseCountByAmount((await responce).data.count));
          console.log("dfvdefrerf");
        }
      } catch (error) {
        console.error("error in get cart data: " + error);
      }
    };

    if (islogin) fetchCartCount();
  }, [islogin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="relative top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface border-b border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">
              🌺
            </span>
            <span className="text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Flower & Bloom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-8">
              <li>
                <Link
                  to="/"
                  className="relative text-main font-medium hover:text-primary transition-colors duration-300 group text-sm xl:text-base"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/allitems"
                  className="relative text-main font-medium hover:text-primary transition-colors duration-300 group text-sm xl:text-base"
                >
                  All Items
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="relative text-main font-medium hover:text-primary transition-colors duration-300 group text-sm xl:text-base"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="relative text-main font-medium hover:text-primary transition-colors duration-300 group text-sm xl:text-base"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              {islogin ? (
                <>
                  <li>
                    <Link
                      to="/cartDetails"
                      className="relative text-main font-medium hover:text-primary transition-colors duration-300 group text-lg xl:text-xl"
                    >
                      🛒
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                      <span className=" top-0 left-0 w-3 h-3 rounded-full bg-amber-50">
                        {cartCount}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm xl:text-base"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm xl:text-base"
                  >
                    Login
                  </button>
                </li>
              )}
              <li className="ml-2">
                <DarkmoodToggler />
              </li>
            </ul>
          </nav>

          {/* Tablet Menu (md to lg) */}
          <nav className="hidden md:block lg:hidden">
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  to="/"
                  className="text-main hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allitems"
                  className="text-main hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Items
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="text-main hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="text-main hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Contact
                </Link>
              </li>

              {islogin && (
                <li>
                  <Link
                    to="/cartDetails"
                    className="relative text-main hover:text-primary transition-colors duration-300 text-lg"
                  >
                    🛒
                  </Link>
                  <span className=" top-0 left-0 w-3 h-3 rounded-full bg-amber-50">
                    {cartCount}
                  </span>
                </li>
              )}
              <li>
                <button
                  onClick={islogin ? handleLogout : handleLogin}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1.5 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300"
                >
                  {islogin ? "Logout" : "Login"}
                </button>
              </li>
              <li>
                <DarkmoodToggler />
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden lg:hidden p-2 rounded-full hover:bg-primary/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-main" size={20} />
            ) : (
              <Menu className="text-main" size={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 border-t border-primary/20 mt-3">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-main font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  <span>🏠</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/allItems"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-main font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  <span>🛍️</span>
                  <span>All Items</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-main font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  <span>ℹ️</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contactUs"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-main font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  <span>📞</span>
                  <span>Contact Us</span>
                </Link>
              </li>
              {islogin && (
                <li>
                  <Link
                    to="/cartDetails"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 px-4 py-3 text-main font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                  >
                    <span>🛒</span>
                    <span>Cart</span>
                    <span className="absolute">{cartCount}</span>
                  </Link>
                </li>
              )}
              <li className="px-4 py-2">
                <button
                  onClick={() => {
                    toggleMenu();
                    islogin ? handleLogout() : handleLogin();
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-full font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  {islogin ? "Logout" : "Login"}
                </button>
              </li>
              <li className="px-4 py-2 flex justify-center">
                <DarkmoodToggler />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
