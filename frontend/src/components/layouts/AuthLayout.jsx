import { motion, AnimatePresence } from "framer-motion";
import ContentArea from "../Utility/ContentArea";
import { useTheme } from "../../context/ThemeContext";

const AuthLayout = ({ children, side = "left" }) => {
  const isFormLeft = side === "left"; // left = login, right = signup
  const { darkMode } = useTheme();

  // 🔵 Login → Blue | 🟢 Signup → Green
  const gradientClass = isFormLeft
    ? darkMode
      ? "from-blue-950 via-gray-950 to-blue-950"
      : "from-blue-100 via-gray-50 to-blue-100"
    : darkMode
    ? "from-green-950 via-gray-950 to-green-950"
    : "from-green-100 via-gray-50 to-green-100";

  // Animation variants
  const formVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden
        bg-gradient-to-br transition-colors duration-500
        ${gradientClass}
      `}
    >
      <AnimatePresence mode="wait">
        {/* FORM AREA (LEFT / LOGIN) */}
        {isFormLeft && (
          <motion.div
            key="form-left"
            className="flex flex-1 justify-center items-center px-12 pt-8 pb-12"
            custom="left"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}

        {/* CONTENT AREA */}
        <motion.div
          key={`content-${side}`}
          custom={side}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="hidden lg:flex flex-1"
        >
          <ContentArea />
        </motion.div>

        {/* FORM AREA (RIGHT / SIGNUP) */}
        {!isFormLeft && (
          <motion.div
            key="form-right"
            className="flex flex-1 justify-center items-center px-12 pt-8 pb-12"
            custom="right"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
