const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { chatWithAI } = require("../controllers/aiController");

const router = express.Router();

// Protected AI chat route
router.post("/chat", protect, chatWithAI);

module.exports = router;
