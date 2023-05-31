import {GoogleMap, MarkerClusterer} from '@react-google-maps/api';

import { useState, useEffect } from 'react';

import { LakeMarker } from './LakeMarker';

import { LakeFilterBox } from './LakeFilterBox'

import { LoadingBox } from './LoadingBox'

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

const mapStyles = [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 13
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#144b53"
          },
          {
              "lightness": 14
          },
          {
              "weight": 1.4
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#08304b"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#0c4152"
          },
          {
              "lightness": 5
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b434f"
          },
          {
              "lightness": 25
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b3d51"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "color": "#146474"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#021019"
          }
      ]
  }
]


export function Map() {

  // const [lakes, setLakes] = useState([]);
  const [lakeWeatherReports, setlakeWeatherReports] = useState([])
  const [center, setCenter] = useState({lat: 0, lng: 0});
  // const [zoom, setZoom] = useState([10])
  const zoom = 7
  // const [bounds, setBounds] = useState([])

  const [loading, setLoading] = useState(false);

  const [lakeCountLimit, setLakeCountLimit] = useState(DEFAULT_LAKE_COUNT_LIMIT)
  // const lakeCountLimit = DEFAULT_LAKE_COUNT_LIMIT

  useEffect(() => {
    async function fetchLakes() {

      setLoading(true)

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

      
      setLoading(false)
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
          styles: mapStyles
        }}
      >
        {loading ? <LoadingBox /> : null}
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
