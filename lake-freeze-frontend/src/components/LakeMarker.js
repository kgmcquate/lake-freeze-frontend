import {MarkerF, InfoWindow} from '@react-google-maps/api';
import {useState} from 'react';


// const frozenIcon = 'bi:snow'

export function LakeMarker({ lake_weather_report, clusterer }) {

    
    const [lakeMarkerInfo, setLakeMarkerInfo] = useState(null)

    const icePngUrl = "https://img.icons8.com/emoji/48/000000/ice.png"
    const waterPngUrl = "https://img.icons8.com/color/48/000000/water.png"
  
    return (
        <MarkerF
            position={{ lat: lake_weather_report.latitude, lng: lake_weather_report.longitude }} 
            icon={{
                url: lake_weather_report.is_frozen ? icePngUrl : waterPngUrl 
            }}
            onMouseOver={
                () => setLakeMarkerInfo(lake_weather_report)
            }
            onMouseOut={() => setLakeMarkerInfo(null)}
            clusterer={clusterer}
        >
            {lakeMarkerInfo  && <LakeInfoBox lake_weather_report={lakeMarkerInfo} />}

        </MarkerF>
    )
  }
  
  
  
  export function LakeInfoBox({lake_weather_report}) {
  
      const formatLakeName = (lakeName) => {
        return lakeName
        .split(" ")
        .map(
                word => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ") + " Lake"
      }

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
