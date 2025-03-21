import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function LeaveRequest() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const token = localStorage.getItem("authToken")
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setEndDate(e.target.value); 
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason.trim()) {
      alert("Please fill all fields.");
      return;
    }
    
    const leaveData = { 
      fromDate: startDate.replace(/-/g, '/'),  
      toDate: endDate.replace(/-/g, '/'), 
      comment: reason 
    };
  
    try {
      const response = await fetch(`${BASE_URL}/leave-request`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(leaveData),
      });
  
      if (response.ok) {
        alert("Leave request submitted successfully!");
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      alert("Error submitting request.",error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave Application</h2>

      {/* Start Date */}
      <div className="mb-3">
        <label className="block font-medium mb-1">Start Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-3 text-gray-500" />
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="pl-12 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
            placeholder="Select start date"
          />
        </div>
      </div>

      {/* End Date */}
      <div className="mb-3">
        <label className="block font-medium mb-1">End Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-3 text-gray-500" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="pl-12 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
            placeholder="Select end date"
          />
        </div>
      </div>

      {/* Reason */}
      <div className="mb-3">
        <label className="block font-medium mb-1">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for leave"
          className="w-full p-2 border rounded h-20"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/Location-Tracker-Web")}
          className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
