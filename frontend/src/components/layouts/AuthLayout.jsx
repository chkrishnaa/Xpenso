import { motion, AnimatePresence } from "framer-motion";

const AuthLayout = ({ children, side = "left" }) => {
  const isFormLeft = side === "left";

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
    <div className="flex w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {/* FORM AREA */}
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
          className="hidden md:flex flex-1 items-center justify-center bg-gray-100"
          custom={side}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <p className="text-gray-500 text-lg">Content area</p>
        </motion.div>

        {/* FORM AREA (RIGHT) */}
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
