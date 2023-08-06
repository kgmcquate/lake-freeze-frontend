import React from 'react';
import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { LakeMarker } from './LakeMarker';
import { LakeFilterBox } from './LakeFilterBox';
import { LoadingBox } from './LoadingBox';
import { mapStyles, clusterStyles } from './mapStyles';
import { WaterBody, WaterBodyWeatherReport, WaterBodyInfo } from './models';
import '../styles/Map.css';

// function MouseInfoBox() {
//   const [mousePos, setMousePos] = useState<any>({});

//   interface AnEvent {

//   }

//   useEffect(() => {
//     const handleMouseMove = (event: any) => {
//       setMousePos({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener(
//         'mousemove',
//         handleMouseMove
//       );
//     };
//   }, []);

//   return (
//     <div>
//       The mouse is at position{' '}
//       <b>
//         ({mousePos.x}, {mousePos.y})
//       </b>
//     </div>
//   );
// }


/**
 * Calculates the average value of an array.
 * @param arr - Array of numbers
 * @returns Average value
 */
const getAvg = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

export const DEFAULT_LAKE_COUNT_LIMIT = 200;
export const MAX_LAKE_COUNT_LIMIT = 1000;
const DEFAULT_ZOOM = 7;
export const SATELLITE_IMAGE_PREFIX = "water_body_satellite_images/"


/**
 * Map component responsible for displaying the Google Map and markers.
 */
const Map: React.FunctionComponent = () => {
  const [lakeInfos, setLakeInfos] = useState<WaterBodyInfo[]>([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const zoom = DEFAULT_ZOOM;
  const [loading, setLoading] = useState(false);
  const [lakeCountLimit, setLakeCountLimit] = useState(DEFAULT_LAKE_COUNT_LIMIT);

  useEffect(() => {
    async function fetchLakes() {
      setLoading(true);

      // Fetch lakes
      const response = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/water_bodies?${new URLSearchParams({
          limit: lakeCountLimit.toString(),
        })}`
      );
      const lakes: WaterBody[] = await response.json();

      const avgLat = getAvg(lakes.map((lake) =>  Number(lake.latitude) || 0));
      const avgLng = getAvg(lakes.map((lake) =>  Number(lake.longitude) || 0));

      if (!isNaN(avgLat) && !isNaN(avgLng)) {
        setCenter({ lat: avgLat, lng: avgLng });
      }

      const minLat = Math.min(...lakes.map((lake) => Number(lake.latitude) || 0));
      const minLng = Math.min(...lakes.map((lake) => Number(lake.longitude) || 0));
      const maxLat = Math.max(...lakes.map((lake) => Number(lake.latitude) || 0));
      const maxLng = Math.max(...lakes.map((lake) => Number(lake.longitude) || 0));

      // Fetch weather reports
      const weatherReportResponse = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/water_body_weather_reports?${new URLSearchParams({
          lake_ids: lakes.map((lake) => lake.id).sort().join(","), //Sorted so that API result caching works properly
          min_latitude: minLat.toString(),
          max_latitude: maxLat.toString(),
          min_longitude: minLng.toString(),
          max_longitude: maxLng.toString(),
          limit: lakeCountLimit.toString(),
        })}`
      );
      const reports: WaterBodyWeatherReport[] = await weatherReportResponse.json();

      console.log(reports)

      const lakeInfos: WaterBodyInfo[] = lakes.map(lake => ({
          lakeWeatherReport: reports.find(report => report.waterbody_id === lake.id),
          lake: lake
        })
      )

      console.log(lakeInfos)

      setLakeInfos(lakeInfos);
      setLoading(false);
    }

    fetchLakes();
  }, [lakeCountLimit]);

  /**
   * Event handler for the limit change in the LakeFilterBox component.
   * @param value - New limit value
   */
  const onLimitChange = (value: number) => {
    setLakeCountLimit(value);
  };


  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const handleActiveMarker = (markerId: number | null) => {
    // console.log(markerId)
    if (markerId === activeMarkerId) {
      setActiveMarkerId(null) //Toggle
      return;
    }
    setActiveMarkerId(markerId);
  };

  // const handleOnLoad = (map: google.maps.Map ) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   lakeInfos.forEach((lakeInfo) => bounds.extend(
  //       new google.maps.LatLng(
  //         Number(lakeInfo.lake.latitude), 
  //         Number(lakeInfo.lake.longitude)
  //       )
  //     )
  //   );
    
  //   console.log(bounds)

  //   map.fitBounds(bounds);
  // };


  return (
    <div>
      <GoogleMap
        // onLoad={handleOnLoad}
        zoom={zoom}
        center={center}
        onClick={() => handleActiveMarker(null)}
        mapContainerClassName="map-container"
        options={{
          mapTypeControl: false, //Remove ability to change map type
          streetViewControl: false,
          mapTypeId: 'hybrid', // hybrid is satellite images with streets and stuff overlaid
          backgroundColor: 'black',
          styles: mapStyles,
        }}
      >
        {loading ? <LoadingBox /> : null}
        <LakeFilterBox onLimitChange={onLimitChange} />
        
        <MarkerClusterer styles={clusterStyles}>
          {(clusterer) => (
            <div>
              {lakeInfos?.map((lakeInfo) => (
                <LakeMarker
                  key={lakeInfo.lake.id}
                  lakeInfo={lakeInfo}
                  clusterer={clusterer}
                  handleActiveMarker={handleActiveMarker}
                  activeMarkerId={activeMarkerId}
                />
              ))}
            </div>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default Map;
