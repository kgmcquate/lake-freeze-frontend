import {GoogleMap, MarkerClusterer} from '@react-google-maps/api';

import {useState, useEffect} from 'react';

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
  const [isLoading, setIsLoading] =  useState(true)

  const [lakeCountLimit, setLakeCountLimit] = useState(DEFAULT_LAKE_COUNT_LIMIT)

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

    setIsLoading(false)

    // setBounds(
    //   new window.google.maps.LatLngBounds(
    //     window.google.maps.LatLng(minLat, minLng),
    //     window.google.maps.LatLng(maxLat, maxLng)
    //   )
    // )
  }

  useEffect(() => {
    setIsLoading(true)

    fetchLakes()
  }, []);

  const clusterer = <MarkerClusterer></MarkerClusterer>
  console.log(clusterer)

  const onLimitChange = (value) => {
    setLakeCountLimit(value)
    fetchLakes()
  }

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setLakeCountLimit(value), 500);
  //   fetchLakes()

  //   return () => clearTimeout(timeOutId);
  // }, []);

  return (
    <div>

      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName='map-container'
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          mapTypeId: 'hybrid'
        }}
      
        // scaleControl: boolean,
        // streetViewControl: boolean,
        // rotateControl: boolean,
        // fullscreenControl: boolean
        
        >
        <LakeFilterBox
          onLimitChange={onLimitChange}
        />
      {/* <StandaloneSearchBox
          // onLoad={onLoad}
          // onPlacesChanged={
          //   onPlacesChanged
          // }
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </StandaloneSearchBox> */}

{/* 
      <Autocomplete

          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
      </Autocomplete> */}

{/* 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' */}
        {isLoading} ? <div>Loading weather data..</div> : null 
        <MarkerClusterer 
          styles={clusterStyles }
          // styles={{
          //     url: "",
          //     // className?: string;
          //     // height: number;
          //     // width: number;
          //     // anchorText?: number[];
          //     // anchorIcon?: number[];
          //     textColor: "white"
          //     // textSize?: number;
          //     // textDecoration?: string;
          //     // fontWeight?: string;
          //     // fontStyle?: string;
          //     // fontFamily?: string;
          //     // backgroundPosition?: string;
          // }}
          // options={{ 
          //   imagePath: process.env.PUBLIC_URL + `/cluster`,
          //   imageExtension: "png"
          // }}
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
