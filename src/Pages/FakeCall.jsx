import React, { useState, useEffect, useRef, useContext } from "react";
import { PhoneCall, PhoneOff } from "lucide-react";
import ringtone from "../assets/ringtone.mp3";
import fakeCall from "../assets/fakeCall.mp3";
import { AuthContext } from "../context/AuthProvider";
const FakeCall = () => {
  const [incomingCall, setIncomingCall] = useState(false);
  const [answered, setAnswered] = useState(false);
  const ringtoneRef = useRef(new Audio(ringtone));
  const voiceRef = useRef(new Audio(fakeCall));


  const startFakeCall = () => {
    setTimeout(() => {
      setIncomingCall(true);
      ringtoneRef.current.play();
    }, 3000);
  };


  const answerCall = () => {
    setAnswered(true);
    ringtoneRef.current.pause();
    voiceRef.current.play();
  };


  const declineCall = () => {
    setIncomingCall(false);
    setAnswered(false);
    ringtoneRef.current.pause();
    voiceRef.current.pause();
  };
 const { isOpen, setIsOpen, setDarkMode, darkMode, handleClick, setIsLogin, isUserLogIn, setIsUserLogin, user } =
    useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={startFakeCall}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
      >
        Start Fake Call
      </button>

      {incomingCall && !answered && (
        <div className="fixed top-20 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
                                  <div className="bg-white h-2/3 flex items-center flex-col justify-center gap-16 p-6 rounded-lg shadow-lg text-center w-72">
                                          <div>

                                                  <img src={user.img} className="w-20 rounded-full" alt="" />
                                          </div>
                                          <div>
                                                  <h2 className="text-xl font-bold">Incoming Call</h2>
            <p className="text-gray-600">Unknown Caller</p>
            </div>
            <div className="flex justify-center mt-4 gap-8">
              <button
                onClick={answerCall}
                className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition"
              >
                <PhoneCall size={24} />
              </button>
              <button
                onClick={declineCall}
                className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition"
              >
                <PhoneOff size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {answered && (
        <div className="fixed top-20 inset-0 flex flex-col items-center justify-center bg-black text-white text-center">
          <h2 className="text-xl font-bold">Call in Progress...</h2>
          <p className="text-gray-400">Talking...</p>
          <button
            onClick={declineCall}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg hover:scale-105 transition"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
};

export default FakeCall;
