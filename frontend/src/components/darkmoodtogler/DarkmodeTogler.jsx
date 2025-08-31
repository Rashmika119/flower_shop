import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function DarkmoodToggler() {
  const [isDark, setIsDark] = useState(false);

  // Check for theme or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 sm:w-14 sm:h-7 bg-surface border border-primary/20 rounded-full transition-all duration-300 hover:shadow-md hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300"></div>

      {/* Slider */}
      <div
        className={`absolute w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-sm transition-all duration-300 ease-in-out transform flex items-center justify-center ${
          isDark ? "translate-x-4 " : "translate-x-[-15px]"
        }`}
      >
        {/* Icon */}
        {isDark ? (
          <Moon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
        ) : (
          <Sun className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
        )}
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1 sm:px-1.5">
        <Sun
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 ${
            !isDark ? "text-accent opacity-0" : "text-accent/40 opacity-60"
          }`}
        />
        <Moon
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 ${
            isDark ? "text-accent opacity-0" : "text-accent/40 opacity-60"
          }`}
        />
      </div>
    </button>
  );
}

export default DarkmoodToggler;
