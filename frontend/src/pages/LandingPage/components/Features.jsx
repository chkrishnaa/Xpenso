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
      iconColor: darkMode ? "text-green-200" : "text-green-600",
      iconBg: darkMode
        ? "from-green-400 to-green-800"
        : "from-green-200 to-green-400",
    },
    {
      icon: FaArrowDown,
      title: "Manage Expenses",
      description:
        "Log daily expenses, categorize spending, and identify unnecessary outflows instantly.",
      iconColor: darkMode ? "text-red-200" : "text-red-600",
      iconBg: darkMode ? "from-red-400 to-red-800" : "from-red-200 to-red-400",
    },
    {
      icon: FaWallet,
      title: "Real-Time Balance",
      description:
        "Always know your current balance with automatic calculations across income and expenses.",
      iconColor: darkMode ? "text-blue-200" : "text-blue-600",
      iconBg: darkMode
        ? "from-blue-400 to-blue-800"
        : "from-blue-200 to-blue-400",
    },
    {
      icon: FaChartPie,
      title: "Smart Analytics",
      description:
        "Visual analytics help you understand spending patterns and financial habits over time.",
      iconColor: darkMode ? "text-blue-200" : "text-blue-600",
      iconBg: darkMode
        ? "from-blue-400 to-blue-800"
        : "from-blue-200 to-blue-400",
    },
    {
      icon: FaCalendarAlt,
      title: "Monthly Reports",
      description:
        "Get monthly summaries of income, expenses, and savings to plan ahead with confidence.",
      iconColor: darkMode ? "text-green-200" : "text-green-600",
      iconBg: darkMode
        ? "from-green-400 to-green-800"
        : "from-green-200 to-green-400",
    },
    {
      icon: FaLock,
      title: "Secure & Private",
      description:
        "Your financial data is protected with secure authentication and privacy-first design.",
      iconColor: darkMode ? "text-gray-200" : "text-gray-700",
      iconBg: darkMode
        ? "from-gray-500 to-gray-800"
        : "from-gray-200 to-gray-400",
    },
  ];

  return (
    <section
      id="features"
      className={`relative py-24 overflow-hidden ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue Blob */}
        <div
          className={`absolute top-40 left-16 w-72 h-72 rounded-full blur-[120px]
            ${darkMode ? "bg-blue-600 opacity-80" : "bg-blue-300 opacity-100"}
          `}
        />

        {/* Green Blob */}
        <div
          className={`absolute bottom-60 right-20 w-80 h-80 rounded-full blur-[140px]
            ${darkMode ? "bg-green-600 opacity-95" : "bg-green-300 opacity-100"}
          `}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 mob:mb-16"
        >
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              manage money
            </span>
          </h2>

          <p
            className={`text-md mob:text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0
 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Xpenso gives you complete control over your finances with simple
            tools, clear insights, and powerful analytics.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid gap-3 mob:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl mob:rounded-2xl border backdrop-blur-sm transition-all
                  hover:-translate-y-1 hover:shadow-lg
                  bg-gradient-to-br
                  ${
                    darkMode
                      ? "from-gray-950 via-gray-900 to-gray-950 border-gray-800"
                      : "from-gray-100 via-white to-gray-100 border-gray-200"
                  }
                `}
              >
                {/* ICON */}
                <div
                  className={`w-10 mob:w-12 h-10 mob:h-12 bg-gradient-to-br ${feature.iconBg}
                    rounded-lg mob:rounded-xl flex items-center justify-center mb-2 mob:mb-4`}
                >
                  <Icon
                    className={`w-5 mob:w-6 h-5 mob:h-6 ${feature.iconColor}`}
                  />
                </div>

                <h3
                  className={`text-xl font-semibold mb-1 mob:mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`leading-relaxed text-sm mob:text-base text-justify ${
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
