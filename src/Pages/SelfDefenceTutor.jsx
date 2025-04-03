import React from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const SelfDefenseTutor = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🥋 Self-Defense Tutor - Learn Techniques for Safety
      </motion.h1>

      <motion.div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          🛡️ Basic Self-Defense Techniques
        </h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>👊 **Palm Strike**: Aim for the nose or chin.</li>
          <li>
            🦵 **Knee Strike**: Use your knee to hit the attacker’s groin.
          </li>
          <li>
            🖐 **Escape from Wrist Grab**: Twist your hand towards the
            attacker's thumb.
          </li>
          <li>👟 **Foot Stomp**: Crush their foot with your heel.</li>
        </ul>
      </motion.div>

      <motion.div className="mb-6 bg-yellow-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
          🎥 Video Tutorials
        </h2>
        <ReactPlayer
          url="https://www.youtube.com/shorts/z8T29GYPlVM?feature=share"
          controls
          playing={true}
          muted={true}
          width="100%"
          className="rounded-lg shadow-md"
        />
      </motion.div>

      <motion.div className="mb-6 bg-red-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          🚨 Situational Awareness
        </h2>
        <p className="text-gray-700">
          Stay alert and trust your instincts. Always be aware of exits and
          avoid isolated areas.
        </p>
      </motion.div>

      <motion.div className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          🚔 Emergency Response Strategies
        </h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>
            🔴 **Use your voice**: Scream **“BACK OFF”** loudly to draw
            attention.
          </li>
          <li>
            🛑 **Create a barrier**: Keep objects (bag, book) between you and
            the attacker.
          </li>
          <li>
            📱 **Call for help**: Dial **1091 (Women’s Helpline)** or **100
            (Police)**.
          </li>
        </ul>
      </motion.div>

      <motion.div className="mb-6 bg-green-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          ❓ Frequently Asked Questions (FAQs)
        </h2>
        <details className="mb-2">
          <summary className="font-semibold">
            🔹 Do I need prior training?
          </summary>
          <p className="text-gray-700 ml-4">
            No, these techniques are easy to learn and can be used by anyone.
          </p>
        </details>
        <details className="mb-2">
          <summary className="font-semibold">
            🔹 Where should I aim to stop an attacker?
          </summary>
          <p className="text-gray-700 ml-4">
            Go for **sensitive areas** like the eyes, nose, throat, or groin.
          </p>
        </details>
      </motion.div>

      <motion.div className="text-center">
        <p>
          Check out our{" "}
          <a
            href="https://sakhi-app-frontend.vercel.app"
            className="text-blue-600 font-bold underline"
          >
            Safety Courses
          </a>{" "}
          for more learning!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SelfDefenseTutor;
