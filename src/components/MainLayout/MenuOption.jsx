import React from "react";
import { Menu } from "../../imports/import";
import { useNavigate } from "react-router-dom";

export default function MenuOption() {
  
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: "99999"}}>
      <div className="bg-black text-white w-80 md:w-96 p-2 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h1 className="text-lg font-semibold">Menu Options</h1>
          <button className="bg-red-400 hover:bg-red-600 text-white px-1 py-1 rounded shadow-md transition duration-300"
          onClick={()=>{window.location.replace("http://localhost:3000/Location-Tracker-Web");}}
          >
            ✖
          </button>
        </div>
    
        <div className="mt-4 space-y-2">
          {Menu.map((item, index) => (
            <div
              onClick={()=>{navigate(`${item.url}`) }}
              key={index}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-md shadow-md transition duration-300 cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
