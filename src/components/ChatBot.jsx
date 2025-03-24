import React, { useContext, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";

const ChatBot = () => {
  // const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { isChatOpen, setIsChatOpen } = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]); // Show user message immediately
    setMessage(""); // Clear input box

    setIsLoading(true); // Show loading dots

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    };

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Use .env for API key
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      setIsLoading(false); // Hide loading dots

      if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botMessage = { sender: "bot", text: data.candidates[0].content.parts[0].text };
        setMessages((prev) => [...prev, botMessage]); // Show bot response
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ No response from AI." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Hide loading dots
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Something went wrong." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-2.5 sm:bottom-6 sm:right-6 flex flex-col items-end">
      {isChatOpen && (
        <div className="bg-white w-[100%] max-w-sm sm:max-w-md h-[75vh] sm:h-[400px] shadow-xl rounded-lg p-4 mb-3 border border-gray-300 flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-bold text-gray-700">Chatbot</h2>
            <button onClick={() => setIsChatOpen(false)}>
              <X size={24} color="gray" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-2 text-gray-600 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-[#ff4081] text-white self-end"  // User chat on right
                    : "bg-gray-200 text-gray-800 self-start" // Bot chat on left
                }`}
              >
                {msg.text}
              </div>
            ))}


            {isLoading && (
              <div className="flex space-x-1 self-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
          </div>


          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff4081] outline-none"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#ff4081] p-2 rounded-lg text-white hover:scale-105 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>

        </div>
      )}

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-[#ff4081] p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-transform text-white"
      >
        <MessageCircle size={24} sm:size={32} />
      </button>
    </div>
  );
};

export default ChatBot;
