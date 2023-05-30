import {GoogleMap, MarkerClusterer} from '@react-google-maps/api';

import { useState, useEffect } from 'react';

import { LakeMarker } from './LakeMarker';

import { LakeFilterBox } from './LakeFilterBox'

import './Map.css'

const getAvg = (arr) => arr.reduce((a, b) => a + b) / arr.length


export const DEFAULT_LAKE_COUNT_LIMIT = 200
export const MAX_LAKE_COUNT_LIMIT = 500


const clusterStyles = [1,2,3].map(x => {return {  
    height: x*32, 
    width: x*32,
    textColor: '#ffffff', 
    url: process.env.PUBLIC_URL + `/icons8-circle-96.png`
  }}
)


export function Map() {

  // const [lakes, setLakes] = useState([]);
  const [lakeWeatherReports, setlakeWeatherReports] = useState([])
  const [center, setCenter] = useState({lat: 0, lng: 0});
  // const [zoom, setZoom] = useState([10])
  const zoom = 7
  // const [bounds, setBounds] = useState([])

  const [lakeCountLimit, setLakeCountLimit] = useState(DEFAULT_LAKE_COUNT_LIMIT)
  // const lakeCountLimit = DEFAULT_LAKE_COUNT_LIMIT

  useEffect(() => {
    async function fetchLakes() {
      const response = await fetch(        
        process.env.REACT_APP_LAKES_API_URL + "/lakes?" + new URLSearchParams({
          limit: lakeCountLimit
        })
      )

      const lakes = await response.json() //testData //
    
      const avgLat =  getAvg(lakes.map(lake => {return lake.latitude}))
      const avgLng = getAvg(lakes.map(lake => {return lake.longitude}))
      console.log("avg lat: " + avgLat)
      console.log("avg lng: " + avgLng)

      
      if (!isNaN(avgLat) && !isNaN(avgLng)) {
        setCenter({lat: avgLat, lng: avgLng})
      }
    
      // setLakes(lakes)

      console.log(lakes)

      console.log(lakes.map(lake => lake.latitude))

      const minLat = Math.min(...lakes.map(lake => lake.latitude))
      const minLng = Math.min(...lakes.map(lake => lake.longitude))
      const maxLat = Math.max(...lakes.map(lake => lake.latitude))
      const maxLng = Math.max(...lakes.map(lake => lake.longitude))

      console.log("minLat: " + minLat)
      console.log("maxLat: " + maxLat)
      console.log("maxLng: " + maxLng)

    //TODO  make the lake and the weather report asynchronous
        
      const weatherReportResponse = await fetch(        
        process.env.REACT_APP_LAKES_API_URL + "/lake_weather_reports?" + new URLSearchParams({
          // date: ,
          lake_ids: lakes.map(lake => lake.id).join(","),
          // min_surface_area: Optional[float] = None,
          // max_surface_area: Optional[float] = None,
          min_latitude: minLat,
          max_latitude: maxLat,
          min_longitude: minLng,
          max_longitude: maxLng,
          limit: lakeCountLimit
        })
      )

      const reportsData =  await weatherReportResponse.json()

      setlakeWeatherReports(
        reportsData
      )
    }

    fetchLakes()
  }, [lakeCountLimit]);

  const onLimitChange = (value) => {
    //TODO add debouncing
    setLakeCountLimit(value)
  }

  // const mapStyles = [1,2,3].map(x => {fontFamily: ["Roboto"]})

  return (
    <div>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName='map-container'
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          mapTypeId: 'hybrid',
          backgroundColor: "black",
          styles: [{fontFamily: ["Roboto"], featureType: "hybrid"}]
        }}
      >
        <LakeFilterBox
          onLimitChange={onLimitChange}
        />
        <MarkerClusterer 
          styles={clusterStyles }
        >
          {(clusterer) =>
            lakeWeatherReports.map(lake_weather_report => 
              <LakeMarker
                key={lake_weather_report.lake_id}
                lake_weather_report={lake_weather_report}
                clusterer={clusterer}
              />
            )
          }
        </MarkerClusterer>          
      </GoogleMap>
    </div>
  )
}
