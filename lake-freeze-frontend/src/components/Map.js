import {GoogleMap, MarkerF, MarkerClusterer} from '@react-google-maps/api';

import {useMemo, useState, useEffect} from 'react';

import { LakeMarker, LakeInfoBox } from './LakeMarker';


const getAvg = (arr) => arr.reduce((a, b) => a + b) / arr.length


export function Map() {

  // const [lakes, setLakes] = useState([]);
  const [lakeWeatherReports, setlakeWeatherReports] = useState([])
  const [center, setCenter] = useState([])
  // const [zoom, setZoom] = useState([10])
  const zoom = 10
  const [bounds, setBounds] = useState([])


  useEffect(() => {
    const fetchLakes = async () => {
      const response = await fetch(        
        process.env.REACT_APP_LAKES_API_URL + "/lakes?" + new URLSearchParams({
          limit: 100
        })
      )

      const lakes = await response.json() //testData //
    
      const avgLat =  getAvg(lakes.map(lake => {return lake.latitude}))
      const avgLng = getAvg(lakes.map(lake => {return lake.longitude}))
      console.log("avg lat: " + avgLat)
      console.log("avg lng: " + avgLng)

      setCenter({lat: avgLat, lng: avgLng})


      const minLat = Math.min(lake => {return lake.latitude})
      const minLng = Math.min(lake => {return lake.longitude})
      const maxLat = Math.max(lake => {return lake.latitude})
      const maxLng = Math.max(lake => {return lake.longitude})

      setBounds(
        new window.google.maps.LatLngBounds(
          window.google.maps.LatLng(minLat, minLng),
          window.google.maps.LatLng(maxLat, maxLng)
        )
      )
        
      const reportsResponse = await fetch(        
        process.env.REACT_APP_LAKES_API_URL + "/lake_weather_reports?" + lakes.map(lake => `lake_id=${lake.id}`).join("&")  //TODO this chokes when there's too many lakes
      )

      const reportsData =  await reportsResponse.json()

      console.log(reportsData)

      setlakeWeatherReports(
        reportsData
      )
    }

    fetchLakes()

  }, []);

  // const markers = 

  // return (
  //   <div className="map">
  //     <GoogleMap
  //       zoom={zoom}
  //       center={center}
  //       mapContainerClassName='map-container'
  //       >
  //         {markers}
  //     </GoogleMap>
  //   </div>
  // )

  return (
    <div className="map">
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName='map-container'
        >
        <MarkerClusterer options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}>
          {(clusterer) =>
            lakeWeatherReports.map(w => 
              <LakeMarker
                key={w.lake_id}
                lake_weather_report={w} 
                clusterer={clusterer}
              />
            )
          }
        </MarkerClusterer>          
      </GoogleMap>
    </div>
  )
  

}
