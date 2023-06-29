import React from 'react'

import { InfoWindow, InfoWindowF } from '@react-google-maps/api';
import '../styles/LakeInfoBox.css';

import { LakeInfo } from './models'

/**
 * Formats the lake name to be human readable.
 *
 * @param lakeName - The name of the lake.
 * @returns The formatted lake name.
 */
const formatLakeName = (lakeName: string) => {
  return lakeName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") + " Lake";
};


/**
 * LakeInfoBox component displays additional information about a lake in an InfoWindow.
 * It shows the lake's name, date, meters of ice, and position.
 *
 * @param lakeInfo - The weather report data for the lake.
 */
export function LakeInfoBox({ lakeInfo }: { lakeInfo: LakeInfo }) {

  return (
    <div className='lake-info-box'>
      <InfoWindowF
        position={{ lat: Number(lakeInfo.lake.latitude), lng: Number(lakeInfo.lake.longitude) }}
        
      >
        <div style={{ fontFamily: "Roboto" }}>
          <h2>{formatLakeName(lakeInfo.lake.lake_name)}</h2>
          <ul>
            <li>Date: {lakeInfo.lakeWeatherReport?.date}</li>
            <li>Ice Thickness (m): {lakeInfo.lakeWeatherReport?.ice_m.toFixed(2)}</li>
            {lakeInfo.lake.surface_area_m2 ? <li>Surface Area (m<sup>2</sup>): {lakeInfo.lake.surface_area_m2}</li> : null}
            {lakeInfo.lake.max_depth_m ? <li>Max Depth (m): {lakeInfo.lake.max_depth_m}</li> : null}
            <li>Position: {lakeInfo.lake.latitude},{lakeInfo.lake.longitude}</li>
          </ul>
        </div>
      </InfoWindowF>
    </div>
  );
}