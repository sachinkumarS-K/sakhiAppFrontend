import React, { useContext } from "react";
import FeatureGrid from "./FeatureGrid";
import { AuthContext } from "../context/AuthProvider";

const HeroSection = () => {
  const { setIsChatOpen } = useContext(AuthContext);
  return (
    <div>
      <div className="bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] h-auto w-full flex items-center justify-center text-white text-2xl font-bold p-8 md:p-9">
        <div className="max-w-8xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Empowering Women with AI-Driven Safety & Health Solutions
          </h1>
          <p className="text-lg md:text-xl md:pt-10 pt-6">
            Your trusted companion for safety, health, and legal empowerment.
          </p>
          <div className="mt-4">
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-white font-bold text-[#ff4081] px-8 py-3.5 rounded-xl  transition hover:bg-gray-200"
            >
              Talk to AI Chatbot
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-start max-w-screen">
        <FeatureGrid />
      </div>
    </div>
  );
};

export default HeroSection;
