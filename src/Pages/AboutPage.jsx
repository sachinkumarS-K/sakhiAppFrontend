import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
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
        🔹 About Women's Safety 🔹
      </motion.h1>

      <motion.img
        src="https://images.unsplash.com/photo-1586739050530-2fddeb1770d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Women Safety"
        className="rounded-lg shadow-md w-20 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.section
        className="mb-8 p-5 bg-pink-100 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-pink-700 mb-2">
          Why Women's Safety Matters? 🌍
        </h2>
        <p className="text-gray-700">
          Women's safety is not just a personal concern but a societal issue. A
          safe environment allows women to grow, learn, and contribute to
          society without fear. Raising awareness, supporting victims, and
          enforcing strict laws are necessary steps toward a safer future.
        </p>
      </motion.section>

      <motion.section
        className="mb-8 p-5 bg-purple-100 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          Common Safety Challenges 🚨
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>🚶 Street harassment & stalking</li>
          <li>🏢 Workplace discrimination & harassment</li>
          <li>📱 Cyberbullying & online threats</li>
          <li>🏠 Domestic violence & abusive relationships</li>
          <li>🚇 Safety in public transport & late-night travel</li>
        </ul>
      </motion.section>

      <motion.img
        src="https://source.unsplash.com/800x400/?self-defense"
        alt="Self Defense"
        className="rounded-lg shadow-md w-full mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.section
        className="mb-8 p-5 bg-blue-100 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          Essential Safety Tips 🛡️
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>📍 Always share your live location with a trusted person.</li>
          <li>
            🚶 Be aware of your surroundings and avoid dark, isolated areas.
          </li>
          <li>
            👜 Carry a self-defense tool like pepper spray or a safety alarm.
          </li>
          <li>
            🔊 Trust your instincts—if something feels off, seek help
            immediately.
          </li>
          <li>
            🚌 Prefer well-lit, crowded streets when traveling alone at night.
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="mb-8 p-5 bg-green-100 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Technology for Women's Safety 📱
        </h2>
        <p className="text-gray-700">
          Several apps provide quick emergency assistance:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            📞 <strong>112 India:</strong> National emergency helpline app
          </li>
          <li>
            📲 <strong>Shake2Safety:</strong> Shake phone to send emergency
            alert
          </li>
          <li>
            📍 <strong>My Safetipin:</strong> Helps identify safe & unsafe areas
          </li>
          <li>
            🆘 <strong>bSafe:</strong> GPS tracking & emergency alarms
          </li>
        </ul>
      </motion.section>

      {/* Image Section */}
      <motion.img
        src="https://source.unsplash.com/800x400/?emergency,call"
        alt="Emergency Support"
        className="rounded-lg shadow-md w-full mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.section
        className="mb-8 p-5 bg-yellow-100 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          Legal Rights & Helpline Numbers 📜
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            📞 <strong>National Women Helpline:</strong> 181
          </li>
          <li>
            🚔 <strong>Police Emergency:</strong> 112
          </li>
          <li>
            🏠 <strong>Domestic Abuse Helpline:</strong> 1091
          </li>
          <li>
            💻 <strong>Cyber Crime Helpline:</strong> 1930
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="text-center p-4 bg-gray-200 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-lg font-semibold text-gray-800">
          "Empowerment begins with awareness. Together, we can build a safer
          world for women." 💜
        </p>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
