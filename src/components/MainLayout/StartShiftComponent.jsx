import React, { useState } from "react";
import { CameraCapture } from "../../imports/componentsImports";
import { FaUser, FaMotorcycle, FaCar, FaTrain, FaBus, FaBicycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StartShiftComponent() {
  const [photo, setPhoto] = useState(null);
  const [transportMode, setTransportMode] = useState(null);
  const [transportPhoto, setTransportPhoto] = useState(null);
  const navigate = useNavigate()

  const handleStartTracking = async () => {
    if (!photo) {
      alert("Please capture your photo before starting tracking.");
      return;
    }
    if (!transportMode) {
      alert("Please select a transport mode.");
      return;
    }
    if ((transportMode === "bike" || transportMode === "car") && !transportPhoto) {
      alert(`Please capture a photo of your ${transportMode}.`);
      return;
    }

    // ✅ Prepare API payload
    const payload = {
      userPhoto: photo,
      transportMode,
      transportPhoto: (transportMode === "bike" || transportMode === "car") ? transportPhoto : null
    };

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tracking started successfully!");
      } else {
        alert(`Failed to start tracking: ${data.message}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-green-400 text-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center mb-2">
      <h1 className="text-2xl font-bold">Start Your Shift</h1>
    </div>
      {/* Shift Start Section */}
      <div className="bg-white text-green p-6 rounded-3xl shadow-lg w-full max-w-md text-center">
        <div className="mt-4">
          <h4 className="text-lg flex items-center justify-center gap-2">
            <FaUser /> Your Photo
          </h4>
          {photo ? (
            <img src={photo} alt="Captured" className="w-60 h-40 object-cover rounded-lg border mt-2" />
          ) : (
            <CameraCapture onCapture={setPhoto} />
          )}

          {photo && (
            <button 
            style={{ borderRadius: "25px" }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600" onClick={() => setPhoto(null)}>
              Retake
            </button>
          )}
        </div>
      </div>

      {/* Transport Selection Section */}
      <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md text-center mt-6 mb-4">
        <h4 className="text-xl font-semibold">Select Transport Mode</h4>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {[
            { mode: "bike", icon: <FaMotorcycle /> },
            { mode: "car", icon: <FaCar /> },
            { mode: "train", icon: <FaTrain /> },
            { mode: "bus", icon: <FaBus /> },
            { mode: "rikshaw", icon: <FaBicycle /> },
          ].map(({ mode, icon }) => (
            <button
              key={mode}
              style={{ borderRadius: "50px" }}
              className={`px-4 py-2 rounded-3xl border flex items-center gap-2 transition-all ${
                transportMode === mode
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setTransportMode(mode)}
            >
              {icon} {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Transport Photo Section */}
      {(transportMode === "bike" || transportMode === "car") ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-2 mb-4">
          <h4 className="text-lg font-semibold">Capture {transportMode} Photo</h4>
          {transportPhoto ? (
            <img src={transportPhoto} alt="Captured" className="w-40 h-40 object-cover rounded-lg border mt-2" />
          ) : (
            <CameraCapture onCapture={setTransportPhoto} />
          )}

          {transportPhoto && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600" onClick={() => setTransportPhoto(null)}>
              Retake
            </button>
          )}
        </div>
      ) 
      : 
      null
      }
      <button 
        onClick={()=>{handleStartTracking}}
        style={{ borderRadius: "25px" }}
        className="bg-green-500 text-white px-6 py-2 rounded-full  mt-6 mb-4 shadow-md hover:bg-green-600 transition-all">
        Start Tracking
      </button>
      <button 
        onClick={()=>{navigate('/Location-Tracker-Web')}}
        style={{ borderRadius: "25px" }}
        className="bg-red-400 text-white px-6 py-2 rounded-full  mt-6 shadow-md hover:bg-green-600 transition-all">
        Cancel
      </button>
    </div>
  );
}
