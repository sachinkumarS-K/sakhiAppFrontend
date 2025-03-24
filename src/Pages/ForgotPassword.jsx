import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }
    try {
      setLoading(true);
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgotPassword`, { email }),
        {
          loading: "Sending reset link...",
          success: "Reset link sent! Check your email.",
          error: "Failed to send reset link. Try again!"
        }
      );
      setEmail("");
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] p-4">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-[#ff4081] mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
        <form className="space-y-6" onSubmit={handleForgotPassword}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Remembered your password? {" "}
          <button onClick={() => navigate("/auth")} className="text-[#ff4081] font-bold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
