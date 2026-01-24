// Variants for image on the left side (Login page)
export const leftItemVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Variants for image on the right side (SignUp page)
export const rightItemVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Variants for form on the right side (Login page)
export const rightFormVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Variants for form on the left side (SignUp page)
export const leftFormVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Legacy export for backward compatibility
export const formVariants = leftFormVariants;

