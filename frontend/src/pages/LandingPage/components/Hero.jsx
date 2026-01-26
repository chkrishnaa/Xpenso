import React from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const stats = [
    {
      icon: FaArrowUp,
      label: "Total Income",
      value: "₹4.2L",
      color: darkMode ? "text-green-400" : "text-green-600",
      bg: darkMode ? "bg-green-900/40" : "bg-green-100",
    },
    {
      icon: FaArrowDown,
      label: "Total Expense",
      value: "₹2.8L",
      color: darkMode ? "text-red-400" : "text-red-600",
      bg: darkMode ? "bg-red-900/40" : "bg-red-100",
    },
    {
      icon: FaWallet,
      label: "Current Balance",
      value: "₹1.4L",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bg: darkMode ? "bg-blue-900/40" : "bg-blue-100",
    },
    {
      icon: FaChartBar,
      label: "Monthly Insights",
      value: "24+",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bg: darkMode ? "bg-blue-900/40" : "bg-blue-100",
    },
  ];

  return (
    <section
      className={`pt-28 pb-20 min-h-screen flex items-center relative overflow-hidden ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Take control of your
              <span
                className={`block mt-2 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                income & expenses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-lg sm:text-xl mb-12 max-w-2xl leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Xpenso helps you track income, manage expenses, and understand
              your financial habits with clear analytics and smart insights.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-start mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className={`group flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition shadow-lg ${
                  darkMode
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Start Tracking
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/features")}
                className={`px-8 py-4 rounded-xl text-lg font-semibold transition shadow-sm ${
                  darkMode
                    ? "text-gray-200 border border-gray-700 hover:bg-gray-800"
                    : "text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                View Features
              </motion.button>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`flex flex-col items-start p-4 rounded-xl transition ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-2`}
                    >
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT SIDE — IMAGES */}
          <div className="relative hidden lg:block w-full h-[600px] rounded-3xl shadow-xl">
            <img
              src={`/assets/HeroSectionImages/STK1-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute -top-16 left-8 w-[500px] bg-transparent z-20"
              alt="Dashboard"
            />

            <img
              src={`/assets/HeroSectionImages/STK2-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute top-10 left-80 w-[300px] bg-transparent z-30"
              alt="Income chart"
            />

            <img
              src={`/assets/HeroSectionImages/STK3-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute top-56 left-12 w-[h-300px] bg-transparent z-10"
              alt="Expense chart"
            />
          </div>
        </div>
      </div>

      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-24 left-10 w-40 h-40 rounded-full blur-3xl opacity-30 ${
            darkMode ? "bg-blue-700" : "bg-blue-300"
          }`}
        />
        <div
          className={`absolute bottom-24 right-10 w-48 h-48 rounded-full blur-3xl opacity-30 ${
            darkMode ? "bg-green-700" : "bg-green-300"
          }`}
        />
      </div>
    </section>
  );
};

export default Hero;
