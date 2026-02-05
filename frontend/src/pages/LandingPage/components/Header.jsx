import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuWalletMinimal } from "react-icons/lu";
import ToggleMode from "../../../components/Utility/ToggleMode";
import { useTheme } from "../../../context/ThemeContext";
import { UserContext } from "../../../context/UserContext";

const Header = () => {
  const { darkMode } = useTheme();
  const { user, clearUser } = useContext(UserContext);

  const IsLoggedIn = !!user;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950/90 border-gray-800"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 mob:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`w-8 h-8 mob:w-9 mob:h-9 rounded-md sm:rounded-lg flex items-center justify-center shadow-sm ${
                darkMode
                  ? "bg-gradient-to-br from-green-500 to-blue-500"
                  : "bg-gradient-to-br from-green-400 to-blue-400"
              }`}
            >
              <LuWalletMinimal className="w-5 h-5 text-white" />
            </div>

            <span
              className={`hidden mob:block text-3xl font-semibold tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Xpenso
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <a
              href="#features"
              className={`transition ${
                darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Features
            </a>
            <a
              href="#analytics"
              className={`transition ${
                darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Analytics
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {IsLoggedIn ? (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md mob:rounded-lg text-sm font-medium text-white transition shadow-sm ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md mob:rounded-lg text-sm font-medium transition ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-md mob:rounded-lg text-sm font-medium text-white transition shadow-sm ${
                    darkMode
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
          </div>
          <div className="scale-75 mob:scale-90 sm:scale-100">
            <ToggleMode />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
