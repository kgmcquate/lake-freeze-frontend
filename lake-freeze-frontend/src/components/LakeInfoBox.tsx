import React from 'react'

import { InfoWindow } from '@react-google-maps/api';
import '../styles/LakeInfoBox.css';

import { LakeWeatherReport } from './models'

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
 * @param lake_weather_report - The weather report data for the lake.
 */
export function LakeInfoBox({ lake_weather_report }: { lake_weather_report: LakeWeatherReport }) {


  return (
    <div className='lake-info-box'>
      <InfoWindow
        position={{ lat: lake_weather_report.latitude, lng: lake_weather_report.longitude }}
      >
        <div style={{ fontFamily: "Roboto" }}>
          <h2>{formatLakeName(lake_weather_report.lake_name)}</h2>
          <ul>
            <li>Date: {lake_weather_report.date}</li>
            <li>Meters of Ice: {lake_weather_report.ice_m.toFixed(2)}</li>
            <li>Position: {lake_weather_report.latitude},{lake_weather_report.longitude}</li>
          </ul>
        </div>
      </InfoWindow>
    </div>
  );
}