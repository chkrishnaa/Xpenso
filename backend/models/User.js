const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      select: false,
    },

    profileImageUrl: { type: String, default: null },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: { type: String, default: null },

    verifyOtp: { type: String, select: false },
    verifyOtpExpireAt: Date,
    isAccountVerified: { type: Boolean, default: false },

    resetOtp: { type: String, select: false },
    resetOtpExpireAt: Date,
  },
  { timestamps: true }
);

// ✅ SAFE PASSWORD HASHING
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
