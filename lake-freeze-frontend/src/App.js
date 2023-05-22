import {useMemo, useState, useEffect} from 'react';
import './App.css';
import {GoogleMap, GoogleMapProps, useLoadScript, MarkerF} from '@react-google-maps/api';

import { Map } from "./components/Map.js"

// https://aws.amazon.com/blogs/compute/building-server-side-rendering-for-react-in-aws-lambda/

// const testData = [
//   {"longitude":-95.82589709999999,"id":3,"state_or_province":"minnesota","nearby_city_latitude":null,"max_depth_m":2.1336,"surface_area_m2":1088604.3776256,"latitude":46.7584275,"nearby_city_name":"detroit lakes","lake_name":"abbey","country":"USA","nearby_city_longitude":null},
//   {"longitude":-94.40303660000001,"id":7,"state_or_province":"minnesota","nearby_city_latitude":null,"max_depth_m":9.144,"surface_area_m2":190202.25185280002,"latitude":45.6047036,"nearby_city_name":"avon","lake_name":"achman","country":"USA","nearby_city_longitude":null},
//   {"longitude": 44.9812577, "latitude": -93.2716135, "id": 100000}

// ]

// 44.9812577,-93.2716135


/*
TODO 
add filter sliders for depth, area, limit
add markers for frozen/no frozen
add marker clustering
add info for markers
add search this area

*/



export default function App(){


  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
  )

  if (!isLoaded) return <div>Loading...</div>

  return <Map />
}
