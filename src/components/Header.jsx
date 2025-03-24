import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/first.webp";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Popup from "./Popup";

const Header = () => {
  const { isOpen, setIsOpen, setDarkMode, darkMode, handleClick, setIsLogin, isUserLogIn, setIsUserLogin, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#ff4081] pb-5 pt-2.5">
      <nav className="w-full flex justify-between p-2.5 items-center">

        <div className="h-10 pl-5">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="w-12 rounded-full"
            alt="Logo"
          />
        </div>


        {/* <div className="md:hidden flex justify-center absolute left-1/2 transform -translate-x-1/2 top-2">

        </div> */}


        <div className="md:hidden pr-5">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} color="white" /> : <Menu size={32} color="white" />}
          </button>
        </div>


        <div
          className={`md:flex md:items-center gap-5 md:static absolute z-50 top-16 left-0 w-full bg-[#ff4081] md:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-5 text-white font-bold text-lg items-center p-5 md:p-0">
            <NavLink to={"/"} onClick={handleClick} className="py-2 px-4 md:py-0 cursor-pointer hover:text-gray-300">
              Home
            </NavLink>
            <li className="py-2 px-4 md:py-0 cursor-pointer hover:text-gray-300">About Us</li>
            <li className="py-2 px-4 md:py-0 cursor-pointer hover:text-gray-300">Contact Us</li>
            <li className="py-2 px-4 md:py-0 cursor-pointer hover:text-gray-300">Services</li>
            <li className="py-2 px-4 md:py-0 cursor-pointer hover:text-gray-300">Blog</li>
          </ul>

          {isUserLogIn ? (
            <div className=" ">
               <Popup />
           </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 p-5 md:p-0">
              <NavLink
                to={"/auth"}
                onClick={() => {
                  setIsLogin(true);
                  setIsOpen(!isOpen);
                }}
                className="bg-[rgb(21,3,135)] font-bold text-lg text-center text-white px-6 py-2 rounded-md"
              >
                Login
              </NavLink>
              <NavLink
                to={"/auth"}
                onClick={() => {
                  setIsLogin(false);
                  setIsOpen(!isOpen);
                }}
                className="bg-[rgb(21,3,135)] font-bold text-lg text-center text-white px-6 py-2 rounded-md"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
