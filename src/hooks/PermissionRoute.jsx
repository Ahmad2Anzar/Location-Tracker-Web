import { useState, useEffect } from "react";

export default function PermissionRoute({ children }) {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Check Camera Permission
    //   const cameraPermission = await navigator.mediaDevices.getUserMedia({ video: true }).then(() => true).catch(() => false);

      // Check Location Permission
      const locationPermission = await navigator.permissions.query({ name: "geolocation" }).then(res => res.state === "granted");

      if ( locationPermission) {
        setPermissionsGranted(true);
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Permission check failed:", error);
      setShowPopup(true);
    }
  };

  if (permissionsGranted) {
    return children;
  }

  return (
    showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-bold mb-4">Permissions Required</h2>
          <p>Please grant camera & location permissions from settings to continue.</p>
        </div>
      </div>
    )
  );
}
