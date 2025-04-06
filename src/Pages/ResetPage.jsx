import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/reset-password`, {
          email,
          password,
        }),
        {
          loading: "Resetting password...",
          success: "Password reset successfully!",
          error: "Failed to reset password.",
        }
      );

      navigate("/auth");
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] p-4">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter a new password for <span className="font-semibold">{email}</span>
        </p>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/auth")}
            className="text-blue-600 font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPage;
