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

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`border-t transition-colors ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Logo + Socials */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? "bg-blue-700" : "bg-blue-600"
                }`}
              >
                <FaWallet className="text-white w-5 h-5" />
              </div>
              <span
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Xpenso
              </span>
            </div>

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
                <FaInstagram size={20} />
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
                <FaFacebook size={20} />
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
                <FaGithub size={20} />
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
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Policies */}
            <div>
              <h4
                className={`font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Legal & Policies
              </h4>
              <ul
                className={`space-y-3 text-sm ${
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
                className={`font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Navigation
              </h4>
              <ul
                className={`space-y-3 text-sm ${
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
              ? "border-gray-800 text-gray-500"
              : "border-gray-200 text-gray-500"
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
