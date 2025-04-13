import React, { useContext, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
const quickSuggestions = [
  "What are important self-defense techniques for women?",
  "How to manage stress?",
  "What are symptoms of dengue?",
  "What should I do if I feel unsafe in public?",
  "How much water should I drink daily?"
];
const allowedKeywords = [
  "health", "diet", "exercise", "fitness", "water", "doctor", "disease",
  "stress", "self-defense", "safety", "protection", "medicine", "vaccine", "covid",
  "fever", "dengue", "malaria", "injury", "precaution", "prevention","symptoms" ,"disease" , "help","unsafe" , "security" , "public" , "help"
];

const ChatBot = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { isChatOpen, setIsChatOpen } = useContext(AuthContext);

  const handleSendMessage = async (customMessage) => {
  const inputMessage = customMessage || message;
  if (inputMessage.trim() === "") return;

  const userMessage = { sender: "user", text: inputMessage };
  setMessages((prev) => [...prev, userMessage]);
  setMessage("");

  // Check for allowed keywords
  const matched = allowedKeywords.some((keyword) =>
    inputMessage.toLowerCase().includes(keyword)
  );

  if (!matched) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Sorry, I can only help with health and protection-related queries.",
      },
    ]);
    return;
  }

  setIsLoading(true);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: inputMessage }] }],
    }),
  };

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    setIsLoading(false);

    const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botText) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText }, // raw text, will be parsed in render
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ No response from AI." },
      ]);
    }
  } catch (error) {
    console.error("Error:", error);
    setIsLoading(false);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Something went wrong." },
    ]);
  }
};



  return (
  <div className="fixed bottom-4 right-2.5 sm:bottom-6 sm:right-6 flex flex-col items-end z-50">
    {isChatOpen && (
      <div className="backdrop-blur-xl bg-white/90 border border-pink-200 shadow-2xl w-[100%] max-w-lg sm:max-w-md h-[75vh] sm:h-[480px] rounded-2xl p-4 mb-3 flex flex-col transition-all">


        <div className="flex justify-between items-center border-b border-pink-300 pb-2 mb-3">
          <h2 className="text-lg font-semibold text-pink-600">💬 Sakhi ChatBot</h2>
          <button onClick={() => setIsChatOpen(false)}>
            <X size={22} className="text-gray-500 hover:text-pink-500 transition" />
          </button>
        </div>




          <div className="flex-1 mt-5 overflow-y-auto px-1 pr-2 custom-scrollbar space-y-2">
             <div className="flex flex-wrap gap-2 mb-3 overflow-x-auto">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(suggestion)}
              className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
          {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
      msg.sender === "user"
        ? "bg-[#ff4081] text-white self-end"
        : "bg-gray-100 text-gray-900 self-start"
    }`}
  >
    { msg.text}
  </div>
))}

          {isLoading && (
            <div className="flex space-x-1 self-start px-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}
        </div>


        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    )}

    <button
      onClick={() => setIsChatOpen(!isChatOpen)}
      className="bg-pink-500 hover:bg-pink-600 p-3 sm:p-4 rounded-full shadow-lg transition-transform text-white"
    >
      <MessageCircle size={24} />
    </button>
  </div>
);


};

export default ChatBot;