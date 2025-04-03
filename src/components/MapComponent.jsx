import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState({ hospitals: [], policeStations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchNearbyPlaces(latitude, longitude);
      });
    }
  }, []);

  const fetchNearbyPlaces = async (lat, lng) => {
    setLoading(true);
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // replace with your actual API key

    // URL to Google Places API (nearby search for hospitals and police stations)
    const hospitalsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${apiKey}`;
    const policeStationsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=police&key=${apiKey}`;

    try {
      const hospitalsResponse = await fetch(hospitalsUrl);
      const hospitalsData = await hospitalsResponse.json();

      const policeStationsResponse = await fetch(policeStationsUrl);
      const policeStationsData = await policeStationsResponse.json();

      setPlaces({
        hospitals: hospitalsData.results,
        policeStations: policeStationsData.results,
      });
    } catch (error) {
      console.error('Error fetching places data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh' }}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={userLocation}
          zoom={14}
        >
          {places.hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={{
                lat: hospital.geometry.location.lat,
                lng: hospital.geometry.location.lng,
              }}
              label="Hospital"
            />
          ))}
          {places.policeStations.map((station, index) => (
            <Marker
              key={index}
              position={{
                lat: station.geometry.location.lat,
                lng: station.geometry.location.lng,
              }}
              label="Police Station"
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
