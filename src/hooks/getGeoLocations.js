const getLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        reject("Geolocation not supported");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          reject(error.message);
        }
      );
    });
  };
  
  export default getLocation;
  