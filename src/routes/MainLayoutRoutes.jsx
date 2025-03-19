import { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayoutScreen, DashboardRoutes, UnhandledRoutes, Loading, Planned, StartShiftComponent } from '../imports/import';
import { useRecoilState } from 'recoil';
import locationStates from '../recoil/atom/location_atom';

function MainLayoutRoutes() {
  const [latitude, setLatitude] = useRecoilState(locationStates.latitude);
  const [longitude, setLongitude] = useRecoilState(locationStates.longitude);  
  const [error, setError] = useState(false); 
 
 useEffect(() => {    
    const getLocation = () => {
      if ("geolocation" in navigator) {
        console.log(latitude,longitude,"ROUTES")
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (err) => {
            console.log(err.message);
          }
        ); 
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    getLocation();    
    const interval = setInterval(() => {
      getLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Suspense fallback={<Loading />}>     
        <Routes>          
          <Route index element={<MainLayoutScreen />} />
          <Route path="dashboard/*" element={<DashboardRoutes />} />
          <Route path="planned_routes/*" element={<Planned/>} />
          <Route path="shift" element={<StartShiftComponent/>} />
          <Route path="*" element={<UnhandledRoutes />} />
        </Routes>     
    </Suspense>
  );
}

export default MainLayoutRoutes;
