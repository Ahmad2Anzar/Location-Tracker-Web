import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page after logout
  };
  
  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Location Tracker</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="hover:bg-red-700 text-white p-2 rounded-full shadow-md transition duration-300"
        >
          <FaSignOutAlt size={24} />
        </button>
      </nav>

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-80">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
