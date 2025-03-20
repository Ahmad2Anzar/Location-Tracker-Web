import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddRouteForm() {
  const [formData, setFormData] = useState({
    routeLocation: "",
    dealerName: "",
    dealerPhone: "",
  });
  const token = localStorage.getItem("authToken")
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.routeLocation.trim()) newErrors.routeLocation = "Route Location is required.";
    if (!formData.dealerName.trim()) newErrors.dealerName = "Dealer Name is required.";
    if (!formData.dealerPhone.trim() || !/^\d{10}$/.test(formData.dealerPhone))
      newErrors.dealerPhone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const payload = {
        dealerName: formData.dealerName,
        routeAddress: formData.routeLocation,
        dealerNumber: formData.dealerPhone,
         
      };
  
      try {
        const response = await fetch(`${BASE_URL}/routes_plan_from_user`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) throw new Error("Failed to add route.");
  
        const result = await response.json();
        alert("Route added successfully! ✅");
        navigate("/Location-Tracker-Web/planned_routes");
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding route. Please try again.");
      }
    }
  };
  

  const handleCancel = () => {
    setFormData({ routeLocation: "", dealerName: "", dealerPhone: "" });
    setErrors({});
    navigate('/Location-Tracker-Web/planned_routes')
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border">
      {/* Heading */}
      <h2 className="text-xl font-bold mb-4">Add Route</h2>

      <form onSubmit={handleSubmit}>

        {/* Route Location */}
        <div className="relative mb-4">
          <input
            type="text"
            id="routeLocation"
            name="routeLocation"
            value={formData.routeLocation}
            onChange={handleChange}
            className={`peer w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${
              errors.routeLocation ? "border-red-500" : "border-gray-300"
            }`}
            
          />
          <label
            htmlFor="routeLocation"
            className={`absolute left-3 bg-white px-1 transition-all text-sm 
              ${formData.routeLocation ? "text-xs -top-3 text-blue-500" : "top-2 text-gray-500"} 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500`}
          >
            Route Location
          </label>
          {errors.routeLocation && <p className="text-red-500 text-xs mt-1">{errors.routeLocation}</p>}
        </div>

        {/* Dealer Name */}
        <div className="relative mb-4">
          <input
            type="text"
            id="dealerName"
            name="dealerName"
            value={formData.dealerName}
            onChange={handleChange}
            className={`peer w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${
              errors.dealerName ? "border-red-500" : "border-gray-300"
            }`}
            
          />
          <label
            htmlFor="dealerName"
            className={`absolute left-3 bg-white px-1 transition-all text-sm 
              ${formData.dealerName ? "text-xs -top-3 text-blue-500" : "top-2 text-gray-500"} 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500`}
          >
            Dealer Name
          </label>
          {errors.dealerName && <p className="text-red-500 text-xs mt-1">{errors.dealerName}</p>}
        </div>

        {/* Dealer Phone Number */}
        <div className="relative mb-4">
          <input
            type="text"
            id="dealerPhone"
            name="dealerPhone"
            value={formData.dealerPhone}
            onChange={handleChange}
            className={`peer w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${
              errors.dealerPhone ? "border-red-500" : "border-gray-300"
            }`}
            
          />
          <label
            htmlFor="dealerPhone"
            className={`absolute left-3 bg-white px-1 transition-all text-sm 
              ${formData.dealerPhone ? "text-xs -top-3 text-blue-500" : "top-2 text-gray-500"} 
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500`}
          >
            Dealer Phone Number
          </label>
          {errors.dealerPhone && <p className="text-red-500 text-xs mt-1">{errors.dealerPhone}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Route
        </button>

        {/* Cancel Button (Below Submit Button) */}
        <button
          type="button"
          onClick={handleCancel}
          className="w-full mt-2 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
