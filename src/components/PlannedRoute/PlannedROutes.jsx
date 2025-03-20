import React, { useState } from "react";
import { BiBorderRadius } from "react-icons/bi";
import { FaArrowLeft, FaSync, FaMapMarkerAlt, FaFlag, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const plannedRoutesData = [
  { id: 1, dealerName: "ABC Traders", status: "Pending", address: "123, Main Street, City" },
  { id: 2, dealerName: "XYZ Supplies", status: "Reached", address: "45, Market Road, Town" },
  { id: 3, dealerName: "MegaMart Dealer", status: "Pending", address: "78, Industrial Area, Metro" },
  { id: 4, dealerName: "Mega Dealer", status: "Completed", address: "78, Industrial Area, Metro, Delhi" }
];
 
export default function PlannedRoutes() {

  const [activeTab,setActiveTab] = useState('milestone')
  
  const navigate = useNavigate();
  
  const handleReach = (status) => {
   console.log(status)
   if(status==="Pending"){
     navigate('reached-milestone')
   }
   else{
    navigate('complete-milestone')
   }
  }

  return (

    
    <div className="max-w-lg mx-auto p-4 bg-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button 
         onClick={()=>navigate('/Location-Tracker-Web')}
         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
          <FaArrowLeft className="text-xl text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold flex-1 text-center text-gray-800">Planned Routes</h2>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
          <FaSync className="text-xl text-gray-700" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow-lg p-2">
            <div className="flex rounded-lg bg-gray-50 p-1">
              <button
                onClick={() => setActiveTab("milestone")}
                className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === "milestone"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Milestone
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === "completed"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Completed 
              </button>
            </div>
          </div>
        </div>

      {/* Cards List */}
      {plannedRoutesData.map((route, index) => (
          <div key={route.id} className = {`relative flex  rounded-xl shadow-md w-full p-4 border-l-8 mb-3 ${route.status === "Pending" ? "bg-red-100" : "bg-green-100"} `} >
            {/* Left Side Index */}
            {/* <div className={`flex flex-col items-center justify-center text-white text-lg font-bold px-4 py-2 rounded-l-xl 
              ${route.status === "Reached" ? "bg-green-400" : "bg-red-400"}`}>
              {index + 1}
            </div> */}

            {/* Main Content */}
            <div className="flex-1 px-4">
              <h6 className="text-lg font-bold">{route.dealerName}</h6>
              {activeTab === 'milestone' ? 
                <p className={`flex items-center text-sm font-medium ${route.status === "Reached" ? "text-green-500" : "text-yellow-500"}`}>
                  <FaCheck className="mr-1" /> {route.status}
                </p>
                :
                null
              }
              <p className="text-gray-600 text-sm flex items-center mt-1">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                {route.address}
              </p>
            </div>

            {/* Buttons */}
            {
              activeTab === 'milestone' ? 
              <div className="absolute top-2 right-2 flex gap-2">
                {/* Fixed Map Button */}
                <button className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full shadow-md hover:bg-purple-200">
                  <FaMapMarkerAlt size={16} />
                </button>

                {/* Dynamic Status Button */}
                <button
                  className={`p-2 rounded-full shadow-md ${route.status === "Reached" ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
                  onClick={()=>handleReach(route.status)}
                >
                  {route.status === "Reached" ? <FaCheck size={16} /> : <FaFlag size={16} />}
                </button>
              </div>
              :
              null
            }
          </div>
        ))}
        <button 
        onClick={()=> navigate('add-routes')}
        style={{borderRadius:"50px"}}
       className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all" >
        Add New Route
      </button>
    </div>
  );
}
