import {useMemo, useState, useEffect} from 'react';
import './App.css';
import {GoogleMap, GoogleMapProps, useLoadScript, MarkerF} from '@react-google-maps/api';

// https://aws.amazon.com/blogs/compute/building-server-side-rendering-for-react-in-aws-lambda/

const testData = [
  {"longitude":-95.82589709999999,"id":3,"state_or_province":"minnesota","nearby_city_latitude":null,"max_depth_m":2.1336,"surface_area_m2":1088604.3776256,"latitude":46.7584275,"nearby_city_name":"detroit lakes","lake_name":"abbey","country":"USA","nearby_city_longitude":null},
  {"longitude":-94.40303660000001,"id":7,"state_or_province":"minnesota","nearby_city_latitude":null,"max_depth_m":9.144,"surface_area_m2":190202.25185280002,"latitude":45.6047036,"nearby_city_name":"avon","lake_name":"achman","country":"USA","nearby_city_longitude":null},
  {"longitude": 44.9812577, "latitude": -93.2716135, "id": 100000}

]

// 44.9812577,-93.2716135


export default function App(){


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
  )

  const [lakes, setLakes] = useState([]);

  useEffect(() => {

    const fetchLakes = async () => {
      const result = await fetch("https://kevin-mcquate.net/lakes")
      const lakes = await result.json() //testData //

      setLakes(lakes)
    }


    fetchLakes()

  }, []);


  if (!isLoaded) return <div>Loading...</div>

  return (
    <Map lakes={lakes}>

    </Map>
  )

}



// function LakeMarker(props) {
//   return <Marker
//     position={{lat: props.latitude, lng: props.longtiude}}
//   ></Marker>

// }

function Map({ lakes, center = { lat: 44.9812577, lng: -93.2716135}, zoom = 10}) {

  // const center = useMemo (() => (center))

  // console.log(lakes)

  // const getAvg = (arr) => arr.reduce((a, b) => a + b) / arr.length

  // const avgLat =  getAvg(lakes.map(lake => {return lake.latitude}))
  // const avgLng = getAvg(lakes.map(lake => {return lake.longitude}))

  // center.lat = avgLat
  // center.lng = avgLng

  const markers = lakes.map(lake => {
    return <MarkerF key={lake.id} position={{ lat: lake.latitude, lng: lake.longitude }} label={lake.lake_name}></MarkerF>
  })

  return <GoogleMap
    zoom={zoom}
    center={center}
    mapContainerClassName='map-container'
    >
      {markers}
  </GoogleMap>
}
