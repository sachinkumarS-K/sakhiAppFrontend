import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "💪 5 Self-Defense Moves Every Woman Should Know",
    excerpt:
      "Learn quick and easy self-defense techniques to protect yourself...",
    image:
      "https://media.istockphoto.com/id/186880486/photo/self-defense.webp?a=1&b=1&s=612x612&w=0&k=20&c=aUwZWZmlMuUgx11PYeN6nPq6k6SvBuL0bG18g6l9GXs=",
  },
  {
    id: 2,
    title: "⚖️ Legal Rights Every Woman Should Be Aware Of",
    excerpt:
      "Know your legal rights for safety, workplace harassment, and domestic violence...",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF3fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "🥗 Nutrition & Fitness Tips for Women’s Health",
    excerpt:
      "A strong body means better self-defense. Explore the best workouts & diet...",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZpdG5lc3MlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "📱 Top 5 Women Safety Apps You Must Have",
    excerpt:
      "Check out the best apps to ensure safety with emergency features...",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BlogPage = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6"
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
        📝 Women's Safety Blog
      </motion.h1>

      <motion.div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BlogPage;
