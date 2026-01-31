import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

  // ================= MOUSE PARALLAX =================
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const mouseX = useSpring(rawX, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  const mouseY = useSpring(rawY, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

    rawX.set(clamp(x, -300, 300));
    rawY.set(clamp(y, -300, 300));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const HeroImages = ({ darkMode, interactive = true }) => {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const mouseX = useSpring(rawX, {
      stiffness: 120,
      damping: 25,
      mass: 0.6,
    });

    const mouseY = useSpring(rawY, {
      stiffness: 120,
      damping: 25,
      mass: 0.6,
    });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

      rawX.set(clamp(x, -300, 300));
      rawY.set(clamp(y, -300, 300));
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    return (
      <motion.div
        onMouseMove={interactive ? handleMouseMove : undefined}
        onMouseLeave={interactive ? handleMouseLeave : undefined}
        className={`relative w-full h-[360px] sm:h-[420px] lg:h-[600px] ${
          interactive ? "" : "pointer-events-none"
        }`}
      >
        {/* STK1 */}
        <motion.img
          src={`/assets/HeroSectionImages/STK1-${
            darkMode ? "dark" : "light"
          }.png`}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[400px] lg:w-[500px] z-[2]"
          style={{
            x: useTransform(mouseX, [-200, 200], [-20, 20]),
            y: useTransform(mouseY, [-200, 200], [-20, 20]),
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />

        {/* STK2 */}
        <motion.img
          src={`/assets/HeroSectionImages/STK2-${
            darkMode ? "dark" : "light"
          }.png`}
          className="absolute top-10 right-1/4 mob:left-2/3 translate-x-1/2 mob:-translate-x-1/2 w-[180px] sm:w-[240px] lg:w-[300px] z-[3]"
          style={{
            x: useTransform(mouseX, [-200, 200], [-35, 35]),
            y: useTransform(mouseY, [-200, 200], [-35, 35]),
          }}
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />

        {/* STK3 */}
        <motion.img
          src={`/assets/HeroSectionImages/STK3-${
            darkMode ? "dark" : "light"
          }.png`}
          className="absolute top-40 mob:top-30 right-[25px] mob:left-1/3 mob:-translate-x-1/2 w-[280px] sm:w-[360px] lg:w-[400px] z-[1]"
          style={{
            x: useTransform(mouseX, [-200, 200], [-50, 50]),
            y: useTransform(mouseY, [-200, 200], [-50, 50]),
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      </motion.div>
    );
  };



  // ================= STATS =================
  const stats = [
    {
      icon: FaArrowUp,
      label: "Total Income",
      value: "₹4.2L",
      color: darkMode ? "text-green-200" : "text-green-500",
      bg: darkMode
        ? "from-green-400 to-green-800"
        : "from-green-200 to-green-400",
    },
    {
      icon: FaArrowDown,
      label: "Total Expense",
      value: "₹2.8L",
      color: darkMode ? "text-red-200" : "text-red-500",
      bg: darkMode
        ? "from-red-400 to-red-800"
        : "from-red-200 to-red-400",
    },
    {
      icon: FaWallet,
      label: "Current Balance",
      value: "₹1.4L",
      color: darkMode ? "text-blue-200" : "text-blue-500",
      bg: darkMode
        ? "from-blue-400 to-blue-800"
        : "from-blue-200 to-blue-400",
    },
    {
      icon: FaChartBar,
      label: "Monthly Insights",
      value: "24+",
      color: darkMode ? "text-violet-200" : "text-violet-500",
      bg: darkMode
        ? "from-violet-400 to-violet-800"
        : "from-violet-200 to-violet-400",
    },
  ];

  return (
    <section
      className={`pt-28 pb-20 min-h-screen flex items-center relative overflow-hidden ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative space-y-6 sm:space-y-6 mob:space-y-8 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Take control of your{" "}
              <span className="block bg-gradient-to-r from-blue-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
                income & expenses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-md mob:text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0
 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Xpenso helps you track income, manage expenses, and understand
              your financial habits with clear analytics and smart insights.
            </motion.p>

            {/* Mobile Images */}
            <div className="block lg:hidden my-8">
              <HeroImages darkMode={darkMode} interactive />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-row gap-2 mob:gap-4 justify-center lg:justify-start items-center"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/signup")}
                className={`flex items-center gap-2 px-4 mob:px-8 py-3 mob:py-4 rounded-lg mob:rounded-xl text-base mob:text-lg font-semibold text-white shadow-lg bg-gradient-to-r ${
                  darkMode
                    ? "from-green-500 to-blue-500"
                    : "from-green-400 to-blue-400"
                }`}
              >
                Start Tracking
                <FaArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/features")}
                className={`px-4 mob:px-8 py-3 mob:py-4 rounded-lg mob:rounded-xl text-base mob:text-lg font-semibold border-2 ${
                  darkMode
                    ? "border-blue-400 text-blue-400 hover:bg-blue-800/20"
                    : "border-blue-300 text-blue-700 hover:bg-blue-500/10"
                }`}
              >
                View Features
              </motion.button>
            </motion.div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mob:gap-8 w-full">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-4 rounded-lg mob:rounded-2xl backdrop-blur-sm transition flex flex-col items-center bg-gradient-to-br ${
                      darkMode
                        ? "from-gray-950 via-gray-900 to-gray-950"
                        : "from-gray-100 via-white to-gray-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.bg} rounded-xl flex items-center justify-center mb-2`}
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
                      className={`text-sm text-center ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT INTERACTIVE IMAGES ================= */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative hidden lg:block w-full h-[600px]"
          >
            <motion.img
              src={`/assets/HeroSectionImages/STK1-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute -top-16 left-8 w-[500px] z-[2]"
              style={{
                x: useTransform(mouseX, [-300, 300], [-20, 20]),
                y: useTransform(mouseY, [-300, 300], [-20, 20]),
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />

            <motion.img
              src={`/assets/HeroSectionImages/STK2-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute top-10 left-80 w-[300px] z-[3]"
              style={{
                x: useTransform(mouseX, [-300, 300], [-35, 35]),
                y: useTransform(mouseY, [-300, 300], [-35, 35]),
              }}
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />

            <motion.img
              src={`/assets/HeroSectionImages/STK3-${
                darkMode ? "dark" : "light"
              }.png`}
              className="absolute top-52 left-0 w-[320px] z-[1]"
              style={{
                x: useTransform(mouseX, [-300, 300], [-50, 50]),
                y: useTransform(mouseY, [-300, 300], [-50, 50]),
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* ================= BACKGROUND BLUR BLOBS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-32 left-20 w-72 h-72 rounded-full blur-[120px] opacity-80 ${
            darkMode ? "bg-blue-600" : "bg-blue-300"
          }`}
        />
        <div
          className={`absolute bottom-60 left-1/3 w-80 h-80 rounded-full blur-[140px] opacity-80 ${
            darkMode ? "bg-green-600" : "bg-green-300"
          }`}
        />
        <div
          className={`absolute top-1/3 right-32 w-64 h-64 rounded-full blur-[120px] opacity-80 ${
            darkMode ? "bg-red-600" : "bg-red-300"
          }`}
        />
      </div>
    </section>
  );
};

export default Hero;
