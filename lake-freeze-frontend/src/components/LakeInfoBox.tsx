import { InfoWindow } from '@react-google-maps/api';
import './styles/LakeInfoBox.css';

import { LakeWeatherReport } from './models'

const formatLakeName = (lakeName: string) => {
  return lakeName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") + " Lake";
};

export function LakeInfoBox({ lake_weather_report }: { lake_weather_report: LakeWeatherReport }) {
  return (
    <div className='lake-info-box'>
      <InfoWindow
        className='lake-info-box'
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