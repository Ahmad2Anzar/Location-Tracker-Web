import React, { useState } from "react";
import { FaPlus, FaTrash, FaCamera, FaUpload, FaCalendarAlt } from "react-icons/fa";
import { CameraCapture } from "../imports/import";

export default function ClaimBills() {
  const [entries, setEntries] = useState([{ id: Date.now(), category: "", amount: "", date: "", file: null }]);
  const [showFilePopup, setShowFilePopup] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [captureMode, setCaptureMode] = useState(null);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), category: "", amount: "", date: "", file: null }]);
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleFileSelection = (id) => {
    setSelectedEntry(id);
    setShowFilePopup(true);
  };

  const handleCapturePhoto = () => {
    setCaptureMode("camera");
    setShowFilePopup(false);
  };

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    setEntries(entries.map(entry => entry.id === selectedEntry ? { ...entry, file } : entry));
    setShowFilePopup(false);
  };

  const handleSubmit = () => {
    console.log("Submitted Entries:", entries);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Claim Bills</h2>

      {entries.map((entry, index) => (
        <div key={entry.id} className="mb-4 p-4 border rounded relative bg-gray-50">
          {/* Category Input */}
          
          <input 
            placeholder="Category"
            type="text" 
            value={entry.category} 
            onChange={(e) => setEntries(entries.map(el => el.id === entry.id ? { ...el, category: e.target.value } : el))}
            className="w-full p-2 border rounded mb-2"
          />
          
          {/* Amount Input */}
          
          <input 
            type="number" 
            placeholder="Amount"
            value={entry.amount} 
            onChange={(e) => setEntries(entries.map(el => el.id === entry.id ? { ...el, amount: e.target.value } : el))}
            className="w-full p-2 border rounded mb-2"
          />

          {/* Date Input */}
          
          <div className="relative">
            <input 
              placeholder="Date"
              type="date" 
              value={entry.date} 
              onChange={(e) => setEntries(entries.map(el => el.id === entry.id ? { ...el, date: e.target.value } : el))}
              className="w-full px-[30px] py-2 border rounded"
            />
            <FaCalendarAlt className="absolute left-2 top-3 text-gray-500" />
          </div>

          {/* Add File Button */}
          <button 
            onClick={() => handleFileSelection(entry.id)} 
            className="mt-3 w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2">
            {entry.file ? entry.file.name || "Captured Image" : <><FaUpload /> Add File</>}
          </button>

          {/* Remove Entry Button */}
          {index > 0 && (
            <button 
              onClick={() => removeEntry(entry.id)} 
              className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <FaTrash size={18} />
            </button>
          )}
        </div>
      ))}
      
      {/* Add Entry Button */}
      <button 
        onClick={addEntry} 
        className="w-full p-2 bg-green-500 text-white rounded flex items-center justify-center gap-2">
        <FaPlus /> Add Entry
      </button>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-between mt-4">
        <button  onClick={handleSubmit}  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Submit</button>
        <button className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500">Cancel</button>
      </div>

      {/* File Upload Popup */}
      {showFilePopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Select an option</h3>
            <button 
              onClick={handleCapturePhoto} 
              className="w-full p-2 bg-purple-500 text-white rounded flex items-center justify-center gap-2 mb-3">
              <FaCamera /> Capture Photo
            </button>
            <label className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2 cursor-pointer">
              <FaUpload /> Upload File
              <input type="file" className="hidden" onChange={handleUploadFile} />
            </label>
            <button 
              onClick={() => setShowFilePopup(false)} 
              className="mt-4 w-full p-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      )}


      {/* Camera Capture Component */}
      {captureMode === "camera" && <CameraCapture onClose={() => setCaptureMode(null)} />}
    </div>
  );
}

  