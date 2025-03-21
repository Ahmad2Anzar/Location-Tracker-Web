import React, { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { FaArrowLeft, FaSync, FaMapMarkerAlt, FaFlag, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


 
export default function PlannedRoutes() {

  const [activeTab,setActiveTab] = useState('milestone');
  const [plannedRoutesData, setPlannedRoutesData] = useState([]);
  const [refresh,setRefresh] = useState(false) ;
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
  
  const handleReach = (status, address, routeId,id ) => {
    console.log(status)
    const route = status === "pending" ? "reached-milestone" : "complete-milestone";
    navigate(`${route}?address=${address}&id=${routeId}&locationId=${id}`);
  };
  
  useEffect(() => {
    const fetchPlannedRoutes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/routes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });
        if (!response.ok) throw new Error("Failed to fetch routes");
  
        const data = await response.json();
        setPlannedRoutesData(data);
      } catch (error) {
        console.error("Error fetching planned routes:", error);
      }
    };
  
    fetchPlannedRoutes();
  }, [refresh]);


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
        <button
          onClick={()=>{setRefresh(!refresh)}}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
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
      {plannedRoutesData && plannedRoutesData.length > 0 ? (
        plannedRoutesData.map((route, index) => (
          <div key={route.id} className={`relative flex rounded-xl shadow-md w-full p-4 border-l-8 mb-3 ${route.status === "pending" ? "bg-red-100" : "bg-green-100"}`}>
            
            {/* Main Content */}
            <div className="flex-1 px-4">
              <h6 className="text-lg font-bold">{route.dealer}</h6>
              {activeTab === 'milestone' && (
                <p className={`flex items-center text-sm font-medium ${route.status === "Reached" ? "text-green-500" : "text-yellow-500"}`}>
                  <FaCheck className="mr-1" /> {route.status}
                </p>
              )}
              <p className="text-gray-600 text-sm flex items-center mt-1">
                <FaMapMarkerAlt className="mr-1 text-red-500" />
                {route.address}
              </p>
            </div>

            {/* Buttons */}
            {activeTab === 'milestone' && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  style={{ borderRadius: "50px" }}
                  className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full shadow-md hover:bg-purple-200"
                >
                  <FaMapMarkerAlt size={16} />
                </button>

                <button
                  className={`p-2 rounded-full shadow-md ${route.status === "Reached" ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
                  onClick={() => handleReach(route.status, route.address, route.route_id, route.id)}
                >
                  {route.status === "Reached" ? <FaCheck size={16} /> : <FaFlag size={16} />}
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg font-semibold mt-4">No Data to Show</p>
      )}


        <button 
        onClick={()=> navigate('add-routes')}
        style={{borderRadius:"50px"}}
       className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all" >
        Add New Route
      </button>
    </div>
  );
}
