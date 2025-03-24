import React, { useState } from 'react'
import { Send, PlusCircle } from "lucide-react";
const SosPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneList, setPhoneList] = useState([]);
  const [message, setMessage] = useState("Hello! This is a test message.");

const sendMessage = async (number) => {
//   if (!number.trim()) {
//     alert("Please enter a valid phone number.");
//     return;
//   }

  try {
    const response = await fetch("http://localhost:5000/api/v1/user/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: number, message }), // ✅ Ensure correct data structure
    });

    const data = await response.json();
    if (data.success) {
      alert("Message sent successfully!");
    } else {
      alert("Failed to send message: " + data.error);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Send Message</h2>

        {/* Input Field */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:scale-105 transition"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Message Input */}
        <textarea
          className="w-full p-2 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {/* Phone Number List */}
        <div className="space-y-2">
          {phoneList.length === 0 ? (
            <p className="text-gray-500">No numbers added.</p>
          ) : (
            phoneList.map((number, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-lg">
                <span className="text-gray-700">{number}</span>
                <button
                  onClick={() => sendMessage(number)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
                >
                  <Send size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SosPage
