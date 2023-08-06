import React from 'react'

import { Marker } from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer/';
import { LakeInfoBox } from './LakeInfoBox';

import '../styles/LakeMarker.css'

import { WaterBodyInfo } from './models'

const icePngUrl = "https://img.icons8.com/emoji/24/000000/ice.png";
const waterPngUrl = "https://img.icons8.com/color/24/000000/water.png";


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
    clusterer,
    handleActiveMarker,
    activeMarkerId
  }: {
    lakeInfo: WaterBodyInfo;
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
            url: lakeInfo.lakeWeatherReport?.is_frozen ? icePngUrl : waterPngUrl
          }}          
          clusterer={clusterer}
          onClick={() => handleActiveMarker(lakeInfo.lake.id)}
        >
          {
            activeMarkerId === lakeInfo.lake.id  ? (
              <LakeInfoBox waterBodyInfo={lakeInfo} onCloseClick={handleActiveMarker} />
            ) : null
          }
        </Marker>
      </div>
    );
}
  
  

