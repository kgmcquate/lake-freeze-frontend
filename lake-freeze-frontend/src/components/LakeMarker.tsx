import React from 'react'

import {MarkerF} from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer/';

import {useState} from 'react';

import { LakeInfoBox } from './LakeInfoBox';

import '../styles/LakeMarker.css'

import { LakeWeatherReport } from './models'

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
  lake_weather_report,
  clusterer
}: {
  lake_weather_report: LakeWeatherReport;
  clusterer?: Clusterer;
}) {
  const [lakeMarkerInfo, setLakeMarkerInfo] = useState<LakeWeatherReport | null>(null);

  return (
    <MarkerF
      position={{ lat: Number(lake_weather_report.latitude), lng: Number(lake_weather_report.longitude) }}
      icon={{
        url: lake_weather_report.is_frozen ? icePngUrl : waterPngUrl
      }}
      onMouseOver={() => setLakeMarkerInfo(lake_weather_report)}
      onMouseOut={() => setLakeMarkerInfo(null)}
      clusterer={clusterer}
    >
      {lakeMarkerInfo && <LakeInfoBox lake_weather_report={lakeMarkerInfo} />}
    </MarkerF>
  );
}
  
  

