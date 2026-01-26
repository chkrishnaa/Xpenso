import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartPie,
  FaWallet,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const Features = () => {
  const { darkMode } = useTheme();

  const FEATURES = [
    {
      icon: FaArrowUp,
      title: "Track Income",
      description:
        "Record all income sources with clear categorization and understand where your money comes from.",
      color: darkMode ? "text-green-400" : "text-green-600",
      bg: darkMode ? "bg-green-900/40" : "bg-green-100",
    },
    {
      icon: FaArrowDown,
      title: "Manage Expenses",
      description:
        "Log daily expenses, categorize spending, and identify unnecessary outflows instantly.",
      color: darkMode ? "text-red-400" : "text-red-600",
      bg: darkMode ? "bg-red-900/40" : "bg-red-100",
    },
    {
      icon: FaWallet,
      title: "Real-Time Balance",
      description:
        "Always know your current balance with automatic calculations across income and expenses.",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bg: darkMode ? "bg-blue-900/40" : "bg-blue-100",
    },
    {
      icon: FaChartPie,
      title: "Smart Analytics",
      description:
        "Visual analytics help you understand spending patterns and financial habits over time.",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bg: darkMode ? "bg-blue-900/40" : "bg-blue-100",
    },
    {
      icon: FaCalendarAlt,
      title: "Monthly Reports",
      description:
        "Get monthly summaries of income, expenses, and savings to plan ahead with confidence.",
      color: darkMode ? "text-green-400" : "text-green-600",
      bg: darkMode ? "bg-green-900/40" : "bg-green-100",
    },
    {
      icon: FaLock,
      title: "Secure & Private",
      description:
        "Your financial data is protected with secure authentication and privacy-first design.",
      color: darkMode ? "text-gray-300" : "text-gray-700",
      bg: darkMode ? "bg-gray-800" : "bg-gray-100",
    },
  ];

  return (
    <section
      id="features"
      className={`py-24 transition-colors ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Everything you need to
            <span
              className={`ml-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            >
              manage money
            </span>
          </h2>

          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Xpenso gives you complete control over your finances with simple
            tools, clear insights, and powerful analytics.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border transition-shadow ${
                  darkMode
                    ? "border-gray-800 bg-gray-900 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    : "border-gray-200 bg-white hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
