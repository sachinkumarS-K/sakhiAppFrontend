import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    try {
      setLoading(true);
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot-password`, { email }),
        {
          loading: "Sending OTP...",
          success: "OTP sent! Check your email.",
          error: "Failed to send OTP. Try again!"
        }
      );
      setShowOtp(true); // Show OTP inputs
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      toast.error("Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify-otp`, {
          email,
          otp: fullOtp,
        }),
        {
          loading: "Verifying OTP...",
          success: "OTP verified! Redirecting...",
          error: "Invalid or expired OTP!",
        }
      );
      navigate("/resetPassword", { state: { email } });
    } catch (error) {
      console.error("OTP Verify Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] p-4">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-[#ff4081] mb-4">
          Forgot Password
        </h2>
        {!showOtp ? (
          <>
            <p className="text-center text-gray-600 mb-6">
              Enter your email to receive a 4-digit OTP.
            </p>
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                  placeholder="Email Address"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff4081] text-white py-3 rounded-lg font-bold hover:bg-[#e63976] transition duration-300"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-6">
              Enter the 4-digit OTP sent to <span className="font-semibold">{email}</span>
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff4081] text-white py-3 rounded-lg font-bold hover:bg-[#e63976] transition duration-300"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/auth")}
            className="text-[#ff4081] font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
