import  { useContext } from "react";
import React, { useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
        const menuRef = useRef(null);
          const {  setDarkMode, darkMode, handleClick, setIsLogin, isUserLogIn, setFormData,setIsUserLogin,user,setUser} =
        useContext(AuthContext);
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            const res = await toast.promise(
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,  {withCredentials:true}),
                {
                    loading: " logging out .....",
                    success: "Logged out Successfully",
                    error: (error) => error.response?.data?.message || "Logout failed"
                }
          );
          setIsUserLogin(false);
            localStorage.removeItem("userInfo")
          localStorage.removeItem("token",)
          setUser(null);
          setFormData({
            email: "",
            password : ""
          })
          navigate("/")
        } catch (error) {
            console.error("Logged out Error:", error);
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <img
  src={user.img}
  onClick={() => setIsOpen(!isOpen)}
  className="w-12 h-12 rounded-full bg-gray-300 flex items-center ml-auto md:ml-0"
  alt=""
/>


            {isOpen && (
                <div className="absolute md:right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                        <p className="text-lg font-semibold"> {user.name} </p>
                                            <p className="text-xs text-gray-500">{user.email }</p>
                    </div>
                    <ul className="text-gray-800">
                        <li onClick={() => {
                            navigate("/me")
                            setIsOpen(!isOpen)
                        }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-red-100 rounded-xl text-red-600 cursor-pointer" onClick={() => logoutUser()}>
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PopupMenu;
