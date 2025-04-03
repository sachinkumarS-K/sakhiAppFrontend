import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "👮 Emergency Assistance",
    description: "Get instant help in emergency situations with 24/7 support.",
    icon: "🚨",
  },
  {
    id: 2,
    title: "🥋 Self-Defense Training",
    description: "Learn self-defense techniques to protect yourself in dangerous situations.",
    icon: "🥊",
  },
  {
    id: 3,
    title: "⚖️ Legal Support",
    description: "Know your rights! Get legal help and advice for women's safety.",
    icon: "📜",
  },
  {
    id: 4,
    title: "📞 Women’s Helpline",
    description: "Call our helpline for guidance, safety tips, and emotional support.",
    icon: "📱",
  },
  {
    id: 5,
    title: "💪 Mental Health Support",
    description: "Connect with counselors and psychologists for mental well-being.",
    icon: "🧠",
  },
  {
    id: 6,
    title: "📍 Safe Spaces & Shelters",
    description: "Find verified safe houses and women’s shelters near you.",
    icon: "🏠",
  },
];

const ServicesPage = () => {
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
        🛡️ Women’s Safety Services
      </motion.h1>

      {/* Services Grid */}
      <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl">{service.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <button className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition">
              Learn More →
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ServicesPage;
