import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { LuWalletMinimal } from "react-icons/lu";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* ===== Animated Top Progress Bar ===== */}
      <div
        className={`relative h-[2px] ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        } w-full overflow-hidden`}
      >
        <div
          className="absolute inset-0 animate-progress-bar
      bg-gradient-to-r from-blue-500 via-green-400 to-blue-500"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Logo + Socials */}
          <div className="flex flex-col gap-5 items-center mob:items-start text-center mob:text-left">
            <Link to="/" className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm ${
                  darkMode
                    ? "bg-gradient-to-br from-green-500 to-blue-500"
                    : "bg-gradient-to-br from-green-400 to-blue-400"
                }`}
              >
                <LuWalletMinimal className="w-5 h-5 text-white" />
              </div>

              <span
                className={`text-3xl font-semibold tracking-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Xpenso
              </span>
            </Link>

            <p
              className={`text-sm leading-relaxed max-w-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Xpenso helps you track income, manage expenses, and gain clarity
              over your financial life with simple and powerful analytics.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-pink-400"
                    : "text-gray-500 hover:text-pink-500"
                }`}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className={`transition ${
                  darkMode
                    ? "text-gray-400 hover:text-red-400"
                    : "text-gray-500 hover:text-red-600"
                }`}
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 gap-10">
            {/* Policies */}
            <div>
              <h4
                className={`font-semibold mb-4 pl-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Legal & Policies
              </h4>
              <ul
                className={`space-y-3 text-sm pl-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <Link
                    to="/terms"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4
                className={`font-semibold mb-4 pl-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Navigation
              </h4>
              <ul
                className={`space-y-3 text-sm pl-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#hero"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#analytics"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`transition ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-12 pt-6 border-t text-center text-sm ${
            darkMode
              ? "border-gray-00 text-gray-500"
              : "border-gray-300 text-gray-500"
          }`}
        >
          <p className="mb-2">
            © {new Date().getFullYear()} Xpenso. All rights reserved.
          </p>
          <p>
            Made with love by{" "}
            <span
              className={`font-semibold ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Krishnakumar !!!
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
