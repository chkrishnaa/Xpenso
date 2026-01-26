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

const ANALYTICS = [
  {
    icon: FaArrowUp,
    label: "Total Income",
    value: "₹4,20,000",
    accent: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: FaArrowDown,
    label: "Total Expense",
    value: "₹2,80,000",
    accent: "text-red-600",
    bg: "bg-red-100",
  },
  {
    icon: FaWallet,
    label: "Net Balance",
    value: "₹1,40,000",
    accent: "text-blue-600",
    bg: "bg-blue-100",
  },
];

const INSIGHTS = [
  {
    icon: FaChartLine,
    title: "Monthly Growth",
    description: "Your savings increased compared to last month.",
    value: "+18%",
    color: "text-green-600",
  },
  {
    icon: FaPercentage,
    title: "Expense Ratio",
    description: "Percentage of income spent this month.",
    value: "67%",
    color: "text-red-600",
  },
];

const Analytics = () => {
  const { darkMode } = useTheme();
  return (
    <section
      id="analytics"
      className={`py-24 transition-colors ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
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
            Financial
            <span className={darkMode ? "text-blue-400" : "text-blue-600"}>
              {" "}
              Analytics
            </span>
          </h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Understand your money flow with clear insights, real-time balance,
            and meaningful financial indicators.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ANALYTICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 border transition ${
                  darkMode
                    ? "bg-gray-900 border-gray-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    : "bg-white border-gray-200 hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? item.bg.replace("100", "900/40") : item.bg
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      darkMode ? item.accent.replace("600", "400") : item.accent
                    }`}
                  />
                </div>
                <div
                  className={`text-3xl font-bold mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INSIGHTS.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 flex items-center gap-6 border transition ${
                  darkMode
                    ? "bg-gray-900 border-gray-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      darkMode
                        ? insight.color.replace("600", "400")
                        : insight.color
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <h4
                    className={`text-lg font-semibold mb-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {insight.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {insight.description}
                  </p>
                </div>

                <div
                  className={`text-2xl font-bold ${
                    darkMode
                      ? insight.color.replace("600", "400")
                      : insight.color
                  }`}
                >
                  {insight.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

};

export default Analytics;
