import {MarkerF} from '@react-google-maps/api';
// import frozenIcon from '@iconify/icons-mdi'
import {useState} from 'react';


const frozenIcon = 'bi:snow'

export function LakeMarker({ lake_weather_report, clusterer }) {

    
  const [lakeMarkerInfo, setLakeMarkerInfo] = useState(null)
  

    return (
        <MarkerF
            position={{ lat: lake_weather_report.latitude, lng: lake_weather_report.longitude }} 
            icon={{
                url: lake_weather_report.is_frozen ? require(`./../snow.svg`).default : require(`./../hot.svg`).default
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

    // return <MarkerF key={lake.id} position={{ lat: lake.latitude, lng: lake.longitude }} label={lake.lake_name}></MarkerF>
}



export function LakeInfoBox({lake_weather_report}) {

    const formatLakeName = (lakeName) => lakeName.charAt(0).toUpperCase() + lakeName.slice(1) + " Lake"

    return (
        <div className="location-info">
            <h2>{ formatLakeName(lake_weather_report.lake_name) }</h2>
            <ul>
                <li>Date: {lake_weather_report.date}</li>
                <li>Meters of Ice: {lake_weather_report.ice_m.toFixed(2)} </li>
                <li>Position: {lake_weather_report.latitude},{lake_weather_report.longitude} </li>
            </ul>
        </div>
    )
}
