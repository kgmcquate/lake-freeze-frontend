import React from 'react'

import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer/';
import { LakeInfoBox } from './LakeInfoBox';
import { Dayjs } from 'dayjs';
import '../styles/LakeMarker.css'

import { WaterBodyInfo } from './models'

const icePngUrl = process.env.PUBLIC_URL + "/lake-frozen.svg";
const waterPngUrl = process.env.PUBLIC_URL + "/lake.svg";


/**
 * LakeMarker component represents a marker on the map for a lake.
 * It displays different icons based on whether the lake is frozen or not.
 * When hovered over, it shows additional information in a LakeInfoBox.
 *
 * @param lake_weather_report - The weather report data for the lake.
 * @param clusterer - The clusterer for marker clustering.
 */
export function LakeMarker({
    lakeInfo,
    date,
    clusterer,
    handleActiveMarker,
    activeMarkerId
  }: {
    lakeInfo: WaterBodyInfo;
    date: Dayjs | null;
    clusterer?: Clusterer;
    handleActiveMarker: (markerId: number | null) => void;
    activeMarkerId: number | null;
  }) {

  const latNum = Number(lakeInfo.lake.latitude)
  const longNum = Number(lakeInfo.lake.longitude)

  if (latNum == null || longNum == null) {
    return null
  }

  return (
      <div style={{margin: "5px"}}>
        Hello
        <Marker
          position={{ lat: latNum, lng: longNum }}
          icon={{
            // size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(30, 30),
            url: lakeInfo.lakeWeatherReport?.is_frozen ? icePngUrl : waterPngUrl
            
          }}          
          clusterer={clusterer}
          onClick={() => handleActiveMarker(lakeInfo.lake.id)}
        >
          {
            activeMarkerId === lakeInfo.lake.id  ? (
              <LakeInfoBox waterBodyInfo={lakeInfo} date={date} onCloseClick={handleActiveMarker} />
            ) : null
          }
        </Marker>
      </div>
    );
}
  
  

