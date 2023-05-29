import {InfoWindow} from '@react-google-maps/api';

const formatLakeName = (lakeName) => {
    return lakeName
    .split(" ")
    .map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ") + " Lake"
  }


export function LakeInfoBox({lake_weather_report}) {
    return (
      <InfoWindow
            position={{ lat: lake_weather_report.latitude, lng: lake_weather_report.longitude }} 
      >
          <div >
              <h2>{ formatLakeName(lake_weather_report.lake_name) }</h2>
              <ul>
                  <li>Date: {lake_weather_report.date}</li>
                  <li>Meters of Ice: {lake_weather_report.ice_m.toFixed(2)} </li>
                  <li>Position: {lake_weather_report.latitude},{lake_weather_report.longitude} </li>
              </ul>
          </div>
      </InfoWindow>

    )

  //   return (
  //       <div className="location-info">
  //           <h2>{ formatLakeName(lake_weather_report.lake_name) }</h2>
  //           <ul>
  //               <li>Date: {lake_weather_report.date}</li>
  //               <li>Meters of Ice: {lake_weather_report.ice_m.toFixed(2)} </li>
  //               <li>Position: {lake_weather_report.latitude},{lake_weather_report.longitude} </li>
  //           </ul>
  //       </div>
  //   )
}