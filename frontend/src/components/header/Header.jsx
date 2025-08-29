import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
    <header className="top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-rose-100/50 shadow-sm">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
              🌺
            </span>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Flower & Bloom
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li>
                <Link
                  to="/"
                  className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/allitems"
                  className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                >
                  All Items
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/cartDetails"
                      className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                    >
                      🛒
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                    >
                      Logout
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogin}
                    className="relative text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 group text-sm lg:text-base"
                  >
                    LogIn
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-rose-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 border-t border-rose-100/50 mt-3">
            <ul className="space-y-3">
              <li>
                <Link
                  to=""
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all duration-300"
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allItems"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all duration-300"
                >
                  🛍️ All Items
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all duration-300"
                >
                  ℹ️ About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactUs"
                  onClick={() => {
                    toggleMenu();
                    handleLogin();
                  }}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all duration-300"
                >
                  📞 Contact Us
                </Link>
              </li>

              <li>
                <button
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all duration-300"
                >
                  LogIn
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
