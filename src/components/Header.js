import { Link } from "react-router-dom";
import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="p-6 bg-white border-b border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Address Book App
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
          >
            Home
          </Link>
          <label
            htmlFor="theme-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="theme-toggle"
                className="sr-only"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <div
                className={`w-12 h-6 transition-all duration-200 ease-linear rounded-full shadow-inner 
                ${theme === "dark" ? "bg-green-400" : "bg-gray-400"}`}
              >
                <span
                  className={`absolute left-1 top-1 transition-all duration-200 ease-linear rounded-full shadow-2xl w-4 h-4 
                  ${
                    theme === "dark"
                      ? "translate-x-6 bg-gray-800"
                      : "translate-x-0 bg-white"
                  }`}
                ></span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Header;
