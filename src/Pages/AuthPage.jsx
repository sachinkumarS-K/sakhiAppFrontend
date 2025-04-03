import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { isLogin, setIsLogin, formData, setFormData, setUser, setIsUserLogin, onChangeHandler } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    console.log(formData);

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast.error("Please fill all the fields !!");
      return;
    }

    const url = isLogin ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login` : `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`;
    const loadingMsg = isLogin ? "Logging in user ....." : "Signing up the user .....";
    const successMsg = isLogin ? "Logged in Successfully" : "Sign Up Successfully";

    try {
      const res = await toast.promise(
        axios.post(url, formData, { withCredentials: true }),
        {
          loading: loadingMsg,
          success: successMsg,
          error: (error) => error.response?.data?.message || "Operation failed"
        }
      );

      setIsUserLogin(true);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setUser({ ...res.data.user });
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      // toast.error("Something went wrong!");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] p-4">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-[#ff4081] mb-6">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                placeholder="Full Name"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
              placeholder="Email Address"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {isLogin && (
            <p className="text-right text-sm text-[#ff4081] leading-0.5 cursor-pointer hover:underline" onClick={() => navigate("/forgotPassword")}>
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            onClick={submitHandler}
            className="w-full bg-[#ff4081] text-white py-2 rounded-lg font-bold hover:bg-[#e63976] transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#ff4081] font-bold hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
