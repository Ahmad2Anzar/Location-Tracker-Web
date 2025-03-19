import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilState } from "recoil";
import locationStates from "../recoil/atom/location_atom";
import { useEffect, useState } from "react";


export default function OSMMap() {
 const [latitude, setLatitude] = useRecoilState(locationStates.latitude)
 const [longitude, setLongitude] = useRecoilState(locationStates.longitude)
 
 const [position, setPosition] = useState(null);

 useEffect(()=>{    
   setPosition([latitude,longitude])      
 },[latitude, longitude]);

  return (
    <>   
    {
      position != null ? 
      <MapContainer center={position} zoom={13} className="h-full w-full">
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {/* Marker at Position */}
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
      // <></>
      : 
      <>
      </>
    }
     </>
  );
}
