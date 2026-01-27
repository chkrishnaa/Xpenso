import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { API_PATHS } from "../../utils/apiPaths";

import axiosInstance from "../../utils/axiosInstance";
import { validatePassword } from "../../utils/helper";

const ResetPassword = () => {
  const navigate = useNavigate();

  // STEP CONTROL
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password

  // DATA
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  // UI
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const inputRefs = useRef([]);

  /* =======================
     STEP 1 — SEND OTP
  ======================= */
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
     STEP 2 — VERIFY OTP (UI only)
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
      toast.error(check.message || "Invalid password");
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
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  /* =======================
     OTP INPUT HANDLING
  ======================= */
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-indigo-600 text-white py-3 rounded">
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={submitOtp} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Enter Verification Code
            </h2>

            <div className="flex justify-between">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  className="w-12 h-12 border text-center rounded"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded">
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={resetPassword} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Set New Password
            </h2>

            {/* New Password */}
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full border p-3 rounded pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border p-3 rounded pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded">
              Reset Password
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
