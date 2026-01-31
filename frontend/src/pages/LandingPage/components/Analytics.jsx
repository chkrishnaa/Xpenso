import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaChartLine,
  FaPercentage,
} from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const Analytics = () => {
  const { darkMode } = useTheme();

  const ANALYTICS = [
    {
      icon: FaArrowUp,
      label: "Total Income",
      value: "₹4,20,000",
      iconColor: darkMode ? "text-green-200" : "text-green-600",
      iconBg: darkMode
        ? "from-green-400 to-green-800"
        : "from-green-200 to-green-400",
    },
    {
      icon: FaArrowDown,
      label: "Total Expense",
      value: "₹2,80,000",
      iconColor: darkMode ? "text-red-200" : "text-red-600",
      iconBg: darkMode ? "from-red-400 to-red-800" : "from-red-200 to-red-400",
    },
    {
      icon: FaWallet,
      label: "Net Balance",
      value: "₹1,40,000",
      iconColor: darkMode ? "text-blue-200" : "text-blue-600",
      iconBg: darkMode
        ? "from-blue-400 to-blue-800"
        : "from-blue-200 to-blue-400",
    },
  ];

  const INSIGHTS = [
    {
      icon: FaChartLine,
      title: "Monthly Growth",
      description: "Your savings increased compared to last month.",
      value: "+18%",
      iconColor: darkMode ? "text-green-200" : "text-green-600",
      iconBg: darkMode
        ? "from-green-400 to-green-800"
        : "from-green-200 to-green-400",
    },
    {
      icon: FaPercentage,
      title: "Expense Ratio",
      description: "Percentage of income spent this month.",
      value: "67%",
      iconColor: darkMode ? "text-red-200" : "text-red-600",
      iconBg: darkMode ? "from-red-400 to-red-800" : "from-red-200 to-red-400",
    },
  ];

  return (
    <section
      id="analytics"
      className={`relative py-24 overflow-hidden ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* ================= BACKGROUND BLUR BLOBS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Violet */}
        <div
          className={`absolute top-48 left-20 w-80 h-80 rounded-full blur-[140px]
            ${
              darkMode
                ? "bg-violet-600 opacity-90"
                : "bg-violet-300 opacity-100"
            }
          `}
        />

        {/* Green */}
        <div
          className={`absolute -bottom-20 left-1/3 w-96 h-96 rounded-full blur-[160px]
            ${darkMode ? "bg-green-600 opacity-85" : "bg-green-300 opacity-100"}
          `}
        />

        {/* Red */}
        <div
          className={`absolute top-1/3 right-24 w-72 h-72 rounded-full blur-[130px]
            ${darkMode ? "bg-red-600 opacity-80" : "bg-red-300 opacity-95"}
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Financial{" "}
            <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>

          <p
            className={`text-md mob:text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0
 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Understand your money flow with clear insights, real-time balance,
            and meaningful financial indicators.
          </p>
        </motion.div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mob:gap-8 mb-16">
          {ANALYTICS.map((item, index) => {
            const Icon = item.icon;
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
                <div
                  className={`w-10 mob:w-12 h-10 mob:h-12 bg-gradient-to-br ${item.iconBg}
                    rounded-lg mob:rounded-xl flex items-center justify-center mb-2 mob:mb-4`}
                >
                  <Icon className={`w-5 mob:w-6 h-5 mob:h-6 ${item.iconColor}`} />
                </div>

                <div
                  className={`text-3xl font-bold mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </div>

                <div
                  className={`text-sm mob:text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mob:gap-8">
          {INSIGHTS.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl mob:rounded-2xl border backdrop-blur-sm
    hover:-translate-y-1 hover:shadow-lg transition-all
    bg-gradient-to-br
    ${
      darkMode
        ? "from-gray-950 via-gray-900 to-gray-950 border-gray-800"
        : "from-gray-100 via-white to-gray-100 border-gray-200"
    }
  `}
              >
                {/* 🔝 Top row: icon + value */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 mob:w-14 h-10 mob:h-14 bg-gradient-to-br ${insight.iconBg}
        rounded-lg mob:rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-5 mob:w-6 h-5 mob:h-6 ${insight.iconColor}`} />
                  </div>

                  <div className={`text-2xl font-bold ${insight.iconColor}`}>
                    {insight.value}
                  </div>
                </div>

                {/* 📝 Title + description */}
                <h4
                  className={`text-xl font-semibold mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {insight.title}
                </h4>

                <p
                  className={`text-sm mob:text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {insight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
