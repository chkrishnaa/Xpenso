import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  /* =======================
     SEND OTP ON LOAD
  ======================= */
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const { data } = await axiosInstance.post(
          API_PATHS.AUTH.SEND_VERIFY_OTP
        );
        toast.success(data.message);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to send verification OTP"
        );
      }
    };

    sendOtp();
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

      // 🔄 Refresh user data
      const { data } = await axiosInstance.get("/api/v1/auth/get-user");
      updateUser(data.user);

      toast.success("Email verified successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     OTP INPUT HANDLING
  ======================= */
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <form onSubmit={submitOtp} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>

          <p className="text-sm text-gray-500 text-center">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-between mt-4">
            {otp.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-12 h-12 border text-center rounded text-lg"
                maxLength={1}
                value={v}
                onChange={(e) => handleOtpChange(e.target.value, i)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded mt-4 disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
