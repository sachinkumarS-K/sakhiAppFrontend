import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const NearbyPlacesMap = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchNearbyPlaces(latitude, longitude);
      },
      (err) => setError("Failed to fetch location. Please enable GPS.")
    );
  }, []);

  const fetchNearbyPlaces = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital+OR+police&bounded=1&viewbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}`
            );

      setPlaces(response.data);
    } catch {
      setError("Failed to fetch nearby places.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl p-5 font-bold text-center">Nearby Police Stations & Hospitals</h2>

      {error && <p className="text-red-500">{error}</p>}

      {location && (
        <MapContainer center={[location.lat, location.lon]} zoom={16} style={{ height: "100vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Location */}
          <Marker position={[location.lat, location.lon]}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Mark All Nearby Places */}
          {places.map((place, index) => (
            <Marker key={index} position={[place.lat, place.lon]}>
              <Popup>{place.display_name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default NearbyPlacesMap;
