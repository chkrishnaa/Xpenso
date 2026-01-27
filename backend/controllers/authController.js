const jwt = require("jsonwebtoken");

const User = require("../models/User");
// const { OAuth2Client } = require("google-auth-library");

// const googleClient = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );

/**
 * STEP 1: Redirect user to Google
 * GET /api/v1/auth/google
 */



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const OTP_EXPIRE_TIME = 3 * 60 * 1000; // 3 minutes

exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Registering user: " + error.message,
        });
          
    }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in user: " + error.message,
    });
  }
};


exports.sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "+verifyOtp +verifyOtpExpireAt"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    // Invalidate old OTP
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + OTP_EXPIRE_TIME;

    await user.save();

    // 📌 EMAIL DISABLED — LOG OTP
    console.log("VERIFY OTP:", otp);
    console.log("OTP expires in 3 minutes");

    return res.json({
      success: true,
      message: "Verification OTP generated (check console)",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const userId = req.user.id;
  const otp = String(req.body.otp || "").trim();

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const user = await User.findById(userId).select(
      "+verifyOtp +verifyOtpExpireAt"
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (!user.verifyOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please resend.",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.isAuthenticated = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      userId: req.user.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.sendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email }).select(
      "+resetOtp +resetOtpExpireAt"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // reset old OTP
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + OTP_EXPIRE_TIME;

    await user.save();

    // TEMP: log OTP
    console.log("RESET PASSWORD OTP:", otp);
    console.log("OTP expires in 3 minutes");

    return res.status(200).json({
      success: true,
      message: "Password reset OTP generated (check console)",
    });
  } catch (error) {
    console.error("SEND RESET OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email }).select(
      "+resetOtp +resetOtpExpireAt"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.password = newPassword; // hashed by pre-save hook
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getUserDetails = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting user details: " + error.message,
        })
    }
}
