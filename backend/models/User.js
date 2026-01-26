const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      min: 10,
      max: 255,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      min: 8,
      select: false, // 🔐 protect password
    },

    profileImageUrl: {
      type: String,
      default: null,
    },

    /* =====================
       AUTH PROVIDERS
    ====================== */
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: null,
    },

    /* =====================
       EMAIL VERIFICATION
    ====================== */
    verifyOtp: {
      type: String,
      select: false,
    },

    verifyOtpExpireAt: {
      type: Date,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    /* =====================
       PASSWORD RESET
    ====================== */
    resetOtp: {
      type: String,
      select: false,
    },

    resetOtpExpireAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/* =====================
   PASSWORD HASHING
====================== */
userSchema.pre("save", async function (next) {
  try {
    // Skip password hashing if:
    // 1. Password is not modified
    // 2. Password doesn't exist or is empty
    // 3. User is using Google OAuth (no password needed)
    const isGoogleAuth = this.authProvider === "google";
    const passwordNotModified = !this.isModified("password");
    const noPassword = !this.password || (typeof this.password === "string" && this.password.trim() === "");

    if (passwordNotModified || noPassword || isGoogleAuth) {
      return next();
    }

    // Only hash password if it exists, is modified, and user is not using Google OAuth
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

/* =====================
   PASSWORD MATCH
====================== */
userSchema.methods.matchPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
