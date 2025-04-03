import React from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const NutritionFitness = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      <motion.h1
        className="text-4xl font-bold text-center text-green-600 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🥗 Nutrition & Fitness for Women’s Safety
      </motion.h1>


      <motion.div className="mb-6 bg-yellow-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🍎 Healthy Diet for Strength</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>🥩 **Protein-Rich Foods** – Eggs, Chicken, Lentils (For muscle strength)</li>
          <li>🥦 **Vitamins & Minerals** – Green veggies, Nuts (For immunity & bone health)</li>
          <li>💧 **Hydration** – Drink at least **2-3 liters** of water daily</li>
          <li>🔥 **Avoid Junk & Sugar** – Reduces fatigue & boosts energy</li>
        </ul>
      </motion.div>

      <motion.div className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🏋️‍♀️ Workout Routines for Strength</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>💪 **Push-ups** – Strengthens arms & core</li>
          <li>🦵 **Squats** – Improves leg strength & balance</li>
          <li>🏃 **Cardio (Jump Rope, Running)** – Increases endurance</li>
          <li>🧘 **Yoga & Stretching** – Boosts flexibility & mindfulness</li>
        </ul>
      </motion.div>


      <motion.div className="mb-6 bg-purple-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">🎥 Quick Home Workout</h2>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=UItWltVZZmE"
          controls
          playing={true}
          muted={true}
          loop={true}
          width="100%"
          className="rounded-lg shadow-md"
        />
      </motion.div>


      <motion.div className="mb-6 bg-red-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-800 mb-2">🚀 Self-Defense & Fitness</h2>
        <p className="text-gray-700">
          Fitness not only improves health but also **enhances self-defense skills**! Stronger muscles and endurance help in emergency situations.
        </p>
      </motion.div>


      <motion.div className="text-center">
        <p>
          💡 Explore more workouts & diet plans in our <a href="https://sakhi-app-frontend.vercel.app" className="text-green-600 font-bold underline">Health & Safety Section</a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NutritionFitness;
