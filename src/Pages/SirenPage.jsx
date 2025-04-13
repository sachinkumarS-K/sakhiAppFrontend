import React, { useState, useRef } from "react";
import { AlertOctagon, XCircle } from "lucide-react";
import sirenSound from "../assets/siren.wav";
const SirenPage = () => {
  const [isSirenOn, setIsSirenOn] = useState(false);
  const audioRef = useRef(new Audio(sirenSound));

  const startSiren = () => {
    setIsSirenOn(true);
    audioRef.current.loop = true;
    audioRef.current.play();
  };

  const stopSiren = () => {
    setIsSirenOn(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isSirenOn ? "bg-red-600 animate-pulse" : "bg-gray-100"
      } transition-all duration-500`}
    >
      <h1 className="text-3xl font-bold text-black mb-6">
        🚨 Emergency Siren 🚨
      </h1>

      <button
        onClick={isSirenOn ? stopSiren : startSiren}
        className={`p-5 text-white rounded-full shadow-lg flex items-center gap-2 transition-transform ${
          isSirenOn
            ? "bg-red-700 animate-bounce"
            : "bg-blue-600 hover:scale-110"
        }`}
      >
        {isSirenOn ? <XCircle size={28} /> : <AlertOctagon size={28} />}
        {isSirenOn ? "Stop Siren" : "Start Siren"}
      </button>
    </div>
  );
};

export default SirenPage;
