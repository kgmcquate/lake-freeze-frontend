/**
 * Main Application Component
 *
 * This component represents the main entry point for the application.
 * It loads the necessary scripts and renders the Map component.
 */

import React from 'react';
import './styles/App.css';
import { useLoadScript } from '@react-google-maps/api';
import Map from "./components/Map";

// TODO: Add filter sliders for depth, area, limit
// TODO: Add markers for frozen/no frozen
// TODO: Add marker clustering
// TODO: Add info for markers
// TODO: Add search this area

// Libraries required by the Google Maps API
const googleMapsLibraries: ("places")[] = ["places"];

const googleMapsApiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

const App: React.FunctionComponent = () => {
  // Load Google Maps API script
  const { isLoaded }: { isLoaded: boolean } = useLoadScript({
    googleMapsApiKey,
    libraries: googleMapsLibraries
  });

  // Render the Map component once the Google Maps API is loaded
  return (
      isLoaded ? <Map /> : <div>Loading...</div>
  );
};

export default App;