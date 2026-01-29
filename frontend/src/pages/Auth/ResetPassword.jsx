import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuTimerReset, LuRotateCcw } from "react-icons/lu";

import { toast } from "react-hot-toast";

import Input from "../../components/Inputs/Input";
import { useTheme } from "../../context/ThemeContext";

import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { validatePassword, formatTime } from "../../utils/helper";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  /* =======================
      STEP CONTROL
  ======================= */
  const [step, setStep] = useState(1);

  /* =======================
      DATA
  ======================= */
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* =======================
      UI
  ======================= */
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef([]);

  /* =======================
      COLORS PER STEP
  ======================= */
  const accent = step === 1 ? "red" : step === 2 ? "blue" : "green";

  /* =======================
      STEP 1 — SEND OTP
  ======================= */
  const OTP_DURATION = 180; // 3 minutes (seconds)

  const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
  const [canResend, setCanResend] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SEND_RESET_OTP, {
        email,
      });
      toast.success(data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  /* =======================
      STEP 2 — VERIFY OTP
  ======================= */
  const submitOtp = (e) => {
    e.preventDefault();
    if (otp.some((v) => !v)) {
      toast.error("Please enter complete OTP");
      return;
    }
    setStep(3);
  };

  /* =======================
      STEP 3 — RESET PASSWORD
  ======================= */
  const resetPassword = async (e) => {
    e.preventDefault();

    const check = validatePassword(password);
    if (!check.valid) {
      toast.error(check.message);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        email,
        otp: otp.join(""),
        newPassword: password,
      });

      toast.success(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  /* =======================
      OTP HANDLING
  ======================= */
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleResendOtp = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.SEND_RESET_OTP, { email });

      toast.success("OTP resent");
      setOtp(Array(6).fill(""));
      setTimeLeft(OTP_DURATION);
      setCanResend(false);

      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length !== 6) return;

    const values = pasted.split("").slice(0, 6);
    setOtp(values);
    inputRefs.current[5]?.focus();
  };

  useEffect(() => {
    if (step !== 2) return;

    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, step]);

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  /* =======================
      UI
  ======================= */
  return (
    <div
      className={`min-h-screen flex justify-center items-center relative overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url("/assets/AuthImages/LoginSignup-dark.png")`,
        }}
      />

      {/* STEP 1 — EMAIL */}
      {step === 1 && (
        <form
          onSubmit={sendOtp}
          className={`space-y-4 w-full max-w-md p-8 rounded-2xl shadow-xl
          bg-gradient-to-br z-20
          ${
            darkMode
              ? "from-gray-950 via-gray-900 to-gray-950"
              : "from-violet-50 via-violet-100 to-violet-50"
          }`}
        >
          <div>
            <h2
              className={`text-2xl font-bold text-center ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Forgot Password
            </h2>

            <p
              className={`text-sm text-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Enter your email address.
            </p>
          </div>

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
            placeholder="Enter your email"
            required
          />

          <button
            disabled={!email}
            className={`
    w-full py-3 rounded-lg font-medium text-white transition-all duration-200
    ${
      email
        ? `
          bg-gradient-to-r from-violet-500 to-violet-700
          hover:from-violet-600 hover:to-violet-800
          cursor-pointer
        `
        : `
          bg-gradient-to-r from-violet-400 to-violet-500
          cursor-not-allowed
        `
    }
    focus:outline-none focus:ring-2 focus:ring-violet-400/60
  `}
          >
            Send OTP
          </button>
        </form>
      )}

      {/* STEP 2 — OTP */}
      {step === 2 && (
        <form
          onSubmit={submitOtp}
          className={`relative space-y-4 w-full max-w-md p-8 rounded-2xl shadow-xl
    bg-gradient-to-br z-20
    ${
      darkMode
        ? "from-gray-950 via-gray-900 to-gray-950"
        : "from-blue-50 via-blue-100 to-blue-50"
    }`}
        >
          <div>
            {" "}
            <h2
              className={`text-2xl font-bold text-center ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Verify OTP
            </h2>
            <p
              className={`mt-2 text-sm text-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Enter a 6-digit code sent to your email address.
            </p>
          </div>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
            {otp.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                value={v}
                maxLength={1}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                className={`w-12 h-12 rounded-lg border text-center text-lg focus:outline-none
          ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300"
          }`}
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}
          <button
            disabled={otp.some((v) => !v)}
            className={`
      w-full py-3 rounded-lg font-medium text-white transition-all duration-200
      ${
        otp.some((v) => !v)
          ? "bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      }
      focus:ring-2 focus:ring-blue-400/60
    `}
          >
            Verify OTP
          </button>

          {/* RESEND + TIMER */}
          <div className="flex justify-between items-center text-sm">
            {/* RESEND */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend}
              className={`flex items-center gap-1 transition
        ${
          canResend
            ? "text-blue-500 hover:underline"
            : "text-gray-400 cursor-not-allowed"
        }`}
            >
              <LuRotateCcw />
              Resend OTP
            </button>

            {/* TIMER */}
            <div
              className={`flex items-center gap-1 font-medium
        ${timeLeft <= 20 ? "text-red-500" : "text-blue-500"}`}
            >
              <LuTimerReset />
              {formatTime(timeLeft)}
            </div>
          </div>
        </form>
      )}

      {/* STEP 3 — RESET PASSWORD */}
      {step === 3 && (
        <form
          onSubmit={resetPassword}
          className={`space-y-4 w-full max-w-md p-8 rounded-2xl shadow-xl
          bg-gradient-to-br z-20
          ${
            darkMode
              ? "from-gray-950 via-gray-900 to-gray-950"
              : "from-green-50 via-green-100 to-green-50"
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Set New Password
          </h2>

          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FaLock}
            rightIcon={showNewPassword ? FaEyeSlash : FaEye}
            onRightIconClick={() => setShowNewPassword((p) => !p)}
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={FaLock}
            rightIcon={showConfirmPassword ? FaEyeSlash : FaEye}
            onRightIconClick={() => setShowConfirmPassword((p) => !p)}
          />

          <button
            disabled={!password || !confirmPassword}
            className={`
    w-full py-3 rounded-lg font-medium text-white transition-all duration-200
    ${
      !password || !confirmPassword
        ? `
          bg-gradient-to-r from-green-400 to-green-500
          cursor-not-allowed
        `
        : `
          bg-gradient-to-r from-green-500 to-green-600
          hover:from-green-600 hover:to-green-700
          cursor-pointer
        `
    }
    focus:outline-none focus:ring-2 focus:ring-green-400/60
  `}
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
