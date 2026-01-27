const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const passport = require("passport");

const {
  registerUser,
  loginUser,
  getUserDetails,

  // 🔐 Email verification
  sendVerifyOtp,
  verifyEmail,

  // 🔑 Password reset
  sendPasswordResetOtp,
  resetPassword,

  // ✅ Auth check
  isAuthenticated,
} = require("../controllers/authController");

const authRoutes = express.Router();

/* =========================
   AUTH (MANUAL)
========================= */
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

/* =========================
   USER
========================= */
authRoutes.get("/get-user", protect, getUserDetails);
authRoutes.get("/is-auth", protect, isAuthenticated);

/* =========================
   EMAIL VERIFICATION
========================= */
authRoutes.post("/send-verify-otp", protect, sendVerifyOtp);
authRoutes.post("/verify-email", protect, verifyEmail);

/* =========================
   PASSWORD RESET
========================= */
authRoutes.post("/send-reset-otp", sendPasswordResetOtp);
authRoutes.post("/reset-password", resetPassword);

/* =========================
   GOOGLE AUTH
========================= */
// START GOOGLE LOGIN
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// GOOGLE CALLBACK
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

/* =========================
   PROFILE IMAGE UPLOAD
========================= */
authRoutes.post(
  "/upload-avatar",
  protect,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    req.user.profileImageUrl = req.file.path;
    await req.user.save();

    res.status(200).json({
      success: true,
      profileImageUrl: req.user.profileImageUrl,
    });
  }
);

module.exports = authRoutes;
