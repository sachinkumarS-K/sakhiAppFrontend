import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={user.img || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-pink-500"
          />
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              placeholder="Email"
              disabled
            />
            <button
              onClick={handleSave}
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded flex items-center mx-auto"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
