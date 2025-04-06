import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/loader/Loader";
const SosPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("sosNumbers")) || [];
    setContacts(savedContacts);
  }, []);

  const formatPhoneNumber = (number) => {
    let formattedNumber = number.trim();
    if (!formattedNumber.startsWith("+91")) {
      formattedNumber = "+91" + formattedNumber.replace(/^0+/, "");
    }
    return formattedNumber;
  };

  const savePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setStatus("❌ Please enter a valid phone number!");
      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);
    if (contacts.includes(formattedNumber)) {
      setStatus("⚠️ This number is already saved!");
      return;
    }

    const updatedContacts = [...contacts, formattedNumber];
    setContacts(updatedContacts);
    localStorage.setItem("sosNumbers", JSON.stringify(updatedContacts));
    setPhoneNumber("");
    setStatus("✅ Emergency contact saved!");
  };

  const deleteContact = (number) => {
    const updatedContacts = contacts.filter((contact) => contact !== number);
    setContacts(updatedContacts);
    localStorage.setItem("sosNumbers", JSON.stringify(updatedContacts));
  };

  const sendSOS = async (toNumber) => {
    if (!toNumber) {
      setStatus("❌ No emergency number set!");
      return;
    }
    setIsLoading(!isLoading);
    if ("geolocation" in navigator) {
      setStatus("📍 Fetching location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const message = `\n🚨 SOS Alert! 🚨\nI'm in danger! Please help!\n📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;

          try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/send-message`,
              {
                to: toNumber,
                message: message,
              }
            );
            setStatus(`🚀 SOS sent to ${toNumber}!`);
          } catch (error) {
            setStatus("❌ Failed to send SOS!");
          } finally {
               setIsLoading(false);
          }
        },
        (error) => {
          setStatus("❌ Failed to get location! " + error.message);
        }
      );
    } else {
      setStatus("❌ Geolocation not supported!");
    }

  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🚨 SOS Emergency</h2>

        <input
          type="text"
          placeholder="Enter emergency phone number (e.g. 9876543210)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={savePhoneNumber}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          Save Emergency Contact
        </button>

        {contacts.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">📞 Saved Contacts:</h3>
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
              >
                <p className="text-lg">{contact}</p>
                {
                  isLoading ? (<Loader/>) : <div>
                  <button
                    onClick={() => sendSOS(contact)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Send SOS
                  </button>
                  <button
                    onClick={() => deleteContact(contact)}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    ❌
                  </button>
                </div>
                }
              </div>
            ))}
          </div>
        )}

        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  );
};

export default SosPage;
