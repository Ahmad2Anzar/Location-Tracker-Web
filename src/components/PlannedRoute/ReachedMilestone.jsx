import React, { useState } from "react";
import { CameraCapture, getBattery, getLocation } from "../../imports/import";
import { FaUser, FaBuilding, FaMotorcycle, FaCar, FaTrain, FaBus, FaBicycle, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation} from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("authToken")

export default function ReachedMilestone() {

  const [userPhoto, setUserPhoto] = useState(null);
  const [entityPhoto, setEntityPhoto] = useState(null);
  const [transportMode, setTransportMode] = useState(null);
  const [transportPhoto, setTransportPhoto] = useState(null);
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Check if submit should be enabled
  const canSubmit = userPhoto && entityPhoto && transportMode 
  const address = queryParams.get("address");
  const routeId = queryParams.get("id");
  const locationId = queryParams.get("locationId");
  console.log(routeId,"iddddd")
   const fetchBattery = async () =>{ 
      const batteryLevel = await getBattery()
      if(batteryLevel){
        return batteryLevel.level*100
      }
    }
  
    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        if(location){
          return location
        };
      } catch (error) {
        console.error("Could not get location:", error);
      }
    };

  const handleSubmit = async () => {
    if (!userPhoto) {
      alert("Please capture your photo before submitting.");
      return;
    }
    if (!entityPhoto) {
      alert("Please capture the entity photo.");
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
      id:locationId,
      timestamp: Date.now(),
      route_id: routeId,
      yourImage: userPhoto,
      entityImage: entityPhoto,
      transportMode,
      transportPhoto: (transportMode === "bike" || transportMode === "car") ? transportPhoto : null,
      currentGeoPoint: fetchLocation(),
      batteryLevel: fetchBattery(),
    };
  
    try {
      const response = await fetch(`${BASE_URL}/reached_milestone`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Milestone submitted successfully!");
        navigate("/Location-Tracker-Web/planned_routes");
      } else {
        alert(`Failed to submit milestone: ${data.message}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Reached Milestone</h1>

      {/* Address Section */}
      <div className="bg-gray-300 text-center p-2 rounded-lg w-full max-w-md flex items-center justify-center gap-2">
        {/* <h4 className="text-lg font-semibold">Address</h4> */}
        <FaMapMarkerAlt className="w-5 h-5 text-red-600 "  />
        <h5 className="text-sm">{address}</h5>
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
          onClick={() => navigate('/Location-Tracker-Web/planned_routes') }
        >
          Cancel
        </button>

        {canSubmit && (
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
            onClick={()=>{handleSubmit}}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
