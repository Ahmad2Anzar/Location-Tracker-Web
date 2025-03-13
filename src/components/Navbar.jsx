import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
    return (
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Location Tracker</h1>
        <button className=" hover:bg-red-700 text-white p-2 rounded-full shadow-md transition duration-300">
          <FaSignOutAlt size={24} /> {/* Logout Icon */}
        </button>
      </nav>
    );
  }
