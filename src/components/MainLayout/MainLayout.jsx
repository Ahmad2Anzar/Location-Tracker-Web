import { FaArrowUp, FaCrosshairs } from "react-icons/fa";
import { OSMMap } from "../../imports/componentsImports";


export default function MainLayout() {
  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col justify-center items-center relative">
      {/* Top Section */}
      <div className="w-full h-1/2 bg-gray-800 flex justify-center items-center rounded-t-xl">
        <OSMMap/>
      </div>

      {/* Bottom Section */}
      <div className="w-full h-1/2 bg-gray-700 flex justify-center items-center relative rounded-b-xl">
        {/* Buttons at the Top of Bottom Section */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-2 py-1 rounded-lg shadow-lg transition-all duration-300">
            Start
          </button>
          <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-2 py-1 rounded-lg shadow-lg transition-all duration-300">
            View Plan
          </button>
        </div>

        <p className="text-white text-lg">Content Here</p>

        {/* Bottom Right Icons */}
        <div className="absolute bottom-25 right-4 flex flex-col space-y-3">
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg shadow-md transition-all duration-300">
            <FaCrosshairs size={18} />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg shadow-md transition-all duration-300">
            <FaArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );

}
