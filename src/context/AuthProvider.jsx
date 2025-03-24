import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLogIn, setIsUserLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
      return;
    }
    setUser(userInfo);
    setIsUserLogin(true);
  }, []);
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);

  const value = {
    user,
    setUser,
    isOpen,
    setIsOpen,
    darkMode,
    setDarkMode,
    isLogin,
    setIsLogin,
    handleClick,
    formData, setFormData,
    onChangeHandler,isUserLogIn, setIsUserLogin,isChatOpen, setIsChatOpen
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
