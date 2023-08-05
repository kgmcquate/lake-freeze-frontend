import React from 'react'

import {MarkerF} from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer/';

import {useState} from 'react';

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
  clusterer
}: {
  lakeInfo: WaterBodyInfo;
  clusterer?: Clusterer;
}) {
  const [lakeMarkerInfo, setLakeMarkerInfo] = useState<WaterBodyInfo | null>(null);

  const latNum = Number(lakeInfo.lake.latitude)
  const longNum = Number(lakeInfo.lake.longitude)

  if (latNum == null || longNum == null) {
    return null
  }

//   function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

  return (
      <MarkerF
        position={{ lat: latNum, lng: longNum }}
        icon={{
          url: lakeInfo.lakeWeatherReport?.is_frozen ? icePngUrl : waterPngUrl
        }}
        onMouseOver={() => setLakeMarkerInfo(lakeInfo)}
        // options={{animation: 0.0}}
        onMouseOut={async () => {
          // await sleep(200);
          setLakeMarkerInfo(null)
        }}
        clusterer={clusterer}
        
      >
        {lakeMarkerInfo && <LakeInfoBox waterBodyInfo={lakeMarkerInfo} />}
      </MarkerF>
    );
}
  
  

