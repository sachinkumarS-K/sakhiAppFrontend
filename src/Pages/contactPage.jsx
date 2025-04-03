import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    if (!email || !name || !message) {
      toast.error("All fields are required!");
      return;
    }
    try {
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/sendEmail`, { email, name }),
        {
          loading: "Submitting the response...",
          success: "Response submitted.",
          error: "Failed. Try again!"
        }
      );
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Contact Form Error:", error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-pink-600 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        📞 Contact Us
      </motion.h1>

      <motion.img
        src="https://images.unsplash.com/photo-1551806235-6692cbfc690b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Contact Us"
        className="rounded-lg shadow-md mb-6 w-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.form
        className="bg-gray-100 p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch 📬</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-pink-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-pink-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-pink-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <motion.button
          type="submit"
          className="w-full p-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Send Message 🚀
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ContactPage;