import React, { useState } from "react";
import { CameraCapture } from "../../imports/componentsImports";
import { FaUser, FaBuilding, FaMotorcycle, FaCar, FaTrain, FaBus, FaBicycle } from "react-icons/fa";

export default function ReachedMilestone({ address }) {
  const [userPhoto, setUserPhoto] = useState(null);
  const [entityPhoto, setEntityPhoto] = useState(null);
  const [transportMode, setTransportMode] = useState(null);
  const [transportPhoto, setTransportPhoto] = useState(null);

  // Check if submit should be enabled
  const canSubmit = userPhoto && entityPhoto && transportMode 

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Reached Milestone</h1>

      {/* Address Section */}
      <div className="bg-gray-300 text-center p-2 rounded-lg w-full max-w-md">
        <h4 className="text-lg font-semibold">Address</h4>
        <p className="text-sm">{address}</p>
      </div>

      {/* User Photo Capture */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-4">
        <h4 className="text-lg flex items-center justify-center gap-2">
          <FaUser /> Capture Your Photo
        </h4>
        {userPhoto ? (
          <img src={userPhoto} alt="Captured" className="w-40 h-40 object-cover rounded-lg border mt-2" />
        ) : (
          <CameraCapture onCapture={setUserPhoto} />
        )}
        {userPhoto && (
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600" onClick={() => setUserPhoto(null)}>
            Retake
          </button>
        )}
      </div>

      {/* Entity Photo Capture */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-4">
        <h4 className="text-lg flex items-center justify-center gap-2">
          <FaBuilding /> Capture Entity Photo
        </h4>
        {entityPhoto ? (
          <img src={entityPhoto} alt="Captured" className="w-40 h-40 object-cover rounded-lg border mt-2" />
        ) : (
          <CameraCapture onCapture={setEntityPhoto} />
        )}
        {entityPhoto && (
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600" onClick={() => setEntityPhoto(null)}>
            Retake
          </button>
        )}
      </div>

      {/* Transport Mode Selection */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-4">
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
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-all ${
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

      {/* Transport Photo Capture (Only for Bike & Car) */}
      {(transportMode === "bike" || transportMode === "car") && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-4">
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
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition-all"
          
        >
          Cancel
        </button>

        {canSubmit && (
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
            // onClick={() => onSubmit({ userPhoto, entityPhoto, transportMode, transportPhoto })}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
