import React, { useRef, useState } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setPhotoTaken(false); // Reset photo state
      }
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
    
    onCapture(canvas.toDataURL("image/png"));
    setPhotoTaken(true);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };
  return (
    <div className="flex flex-col items-center gap-3 transition-all duration-300">
      {/* Camera Preview Box (Only visible when camera is active or a photo is taken) */}
      {(photoTaken || cameraActive) && (
        <div className="w-60 h-40 bg-gray-200 flex items-center justify-center rounded-lg border overflow-hidden shadow-md">
          {photoTaken ? (
            <img
              src={photoTaken}
              alt="Captured"
              className="w-full h-full object-cover rounded-lg animate-fadeIn"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-full object-cover rounded-lg animate-fadeIn"
            />
          )}
        </div>
      )}
  
      {/* Buttons (Visible only when camera is active or needs to be opened) */}
      <div className="flex gap-3 mt-3">
        {!cameraActive && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={startCamera}
          >
            Open Camera
          </button>
        )}
  
        {cameraActive && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={capturePhoto}
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
  
}
