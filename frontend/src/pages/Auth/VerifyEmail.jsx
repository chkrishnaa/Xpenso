import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuTimerReset, LuRotateCcw } from "react-icons/lu";

import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { API_PATHS } from "../../utils/apiPaths";
import { formatTime } from "../../utils/helper";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const { darkMode } = useTheme();

  const OTP_DURATION = 180; // 3 minutes (seconds)

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  /* =======================
      SEND OTP ON LOAD
  ======================= */
  const sendOtp = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SEND_VERIFY_OTP);
      toast.success(data.message);
      setTimeLeft(OTP_DURATION);
      setCanResend(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send verification OTP"
      );
    }
  };

  useEffect(() => {
    sendOtp();
  }, []);

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
    inputRefs.current[0]?.focus();
  }, []);

  /* =======================
      VERIFY OTP
  ======================= */
  const submitOtp = async (e) => {
    e.preventDefault();

    if (otp.some((v) => !v)) {
      toast.error("Please enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.AUTH.VERIFY_EMAIL, {
        otp: otp.join(""),
      });

      const { data } = await axiosInstance.get(API_PATHS.AUTH.GET_USER_DETAILS);
      updateUser(data.user);

      toast.success("Email verified successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  /* =======================
      UI
  ======================= */
  return (
    <div
      className={`min-h-screen flex items-center justify-center
      bg-gradient-to-br
      ${
        darkMode
          ? "from-gray-950 via-gray-900 to-gray-950"
          : "from-white via-gray-50 to-white"
      }`}
    >
      <form
        onSubmit={submitOtp}
        className={`space-y-4 w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-gradient-to-br
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
          Verify Your Email
        </h2>

        <p
          className={`mt-2 text-sm text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Enter the 6-digit email verification code sent to your email address.
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              value={v}
              maxLength={1}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              className={`w-12 h-12 rounded-lg border text-center text-lg
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
            />
          ))}
        </div>

        {/* SUBMIT */}
        <button
          disabled={otp.some((v) => !v) || loading}
          className={`
            w-full py-3 rounded-lg font-medium text-white transition-all
            ${
              otp.some((v) => !v) || loading
                ? "bg-gradient-to-r from-green-400 to-green-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            }
          `}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

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
        ${timeLeft <= 20 ? "text-red-500" : "text-green-500"}`}
          >
            <LuTimerReset />
            {formatTime(timeLeft)}
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
