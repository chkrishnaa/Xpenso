const express = require('express')
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
    registerUser,
    loginUser,
    // forgotPassword,
    // resetPassword,
    getUserDetails,
    // updatePassword,
} = require('../controllers/authController');

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
// authRouter.post('/password/forgot', forgotPassword);
// authRouter.put('/password/reset/:token', resetPassword);
authRoutes.get('/get-user',protect, getUserDetails);

authRoutes.post(
  "/upload-avatar",
  protect,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ SAVE TO CORRECT SCHEMA FIELD
    req.user.profileImageUrl = req.file.path;
    await req.user.save();

    res.status(200).json({
      success: true,
      profileImageUrl: req.user.profileImageUrl,
    });
  }
);



// authRouter.put('/password/update', updatePassword);

module.exports = authRoutes;
