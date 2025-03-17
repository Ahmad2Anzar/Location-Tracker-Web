import React, { useState, useRef } from 'react';
import { FaBicycle, FaCar, FaTrain, FaBus, FaUser, FaMotorcycle } from 'react-icons/fa';

export default function StartShiftComponent() {
  const [photo, setPhoto] = useState(null);
  const [transportMode, setTransportMode] = useState(null);
  const [transportPhoto, setTransportPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const transportVideoRef = useRef(null);
  const transportCanvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [transportCameraActive, setTransportCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraActive(true);
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const capturePhoto = () => {
    if (!cameraActive) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL("image/png"));
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const startTransportCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      transportVideoRef.current.srcObject = stream;
      transportVideoRef.current.play();
      setTransportCameraActive(true);
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const captureTransportPhoto = () => {
    if (!transportCameraActive) return;
    const canvas = transportCanvasRef.current;
    const video = transportVideoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setTransportPhoto(canvas.toDataURL("image/png"));
    stopTransportCamera();
  };

  const stopTransportCamera = () => {
    if (transportVideoRef.current.srcObject) {
      transportVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setTransportCameraActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 p-4">
      {/* Shift Start Section */}
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold">Start Your Shift</h1>
        <div className="mt-4">
          <h4 className="text-lg flex items-center justify-center gap-2"><FaUser /> Your Photo</h4>
          <div className="w-60 h-40 bg-gray-200 flex items-center justify-center rounded-lg border mt-2">
            {photo ? <img src={photo} alt="Captured" className="w-full h-full object-cover rounded-lg" /> : <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-lg" />}
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <div className="mt-2">
            {!photo ? (
              <>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={startCamera}>Open Camera</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={capturePhoto} disabled={!cameraActive}>Capture</button>
              </>
            ) : (
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setPhoto(null)}>Retake</button>
            )}
          </div>
        </div>
      </div>

      {/* Transport Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-6">
        <h4 className="text-xl font-semibold">Select Transport Mode</h4>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {[
            { mode: 'bike', icon: <FaMotorcycle /> },
            { mode: 'car', icon: <FaCar /> },
            { mode: 'train', icon: <FaTrain /> },
            { mode: 'bus', icon: <FaBus /> },
            { mode: 'rikshaw', icon: <FaBicycle /> }
          ].map(({ mode, icon }) => (
            <button
              key={mode}
              className={`px-4 py-2 rounded border flex items-center gap-2 ${transportMode === mode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTransportMode(mode)}
            >
              {icon} {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Transport Photo Section */}
      {transportMode && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-6">
          <h4 className="text-lg font-semibold">Capture {transportMode} Photo</h4>
          <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg border mt-2">
            {transportPhoto ? <img src={transportPhoto} alt="Captured" className="w-full h-full object-cover rounded-lg" /> : <video ref={transportVideoRef} autoPlay className="w-full h-full object-cover rounded-lg" />}
          </div>
          <canvas ref={transportCanvasRef} className="hidden"></canvas>
          <div className="mt-2">
            {!transportPhoto ? (
              <>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={startTransportCamera}>Open Camera</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={captureTransportPhoto} disabled={!transportCameraActive}>Capture</button>
              </>
            ) : (
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setTransportPhoto(null)}>Retake</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
