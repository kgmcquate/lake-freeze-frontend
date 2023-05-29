import {MarkerF} from '@react-google-maps/api';
import {useState} from 'react';

import { LakeInfoBox } from './LakeInfoBox';

import './LakeMarker.css'

// const frozenIcon = 'bi:snow'

export function LakeMarker({ lake_weather_report, clusterer }) {

    
    const [lakeMarkerInfo, setLakeMarkerInfo] = useState(null)

    const icePngUrl = "https://img.icons8.com/emoji/24/000000/ice.png"
    const waterPngUrl = "https://img.icons8.com/color/24/000000/water.png"
  
    return (
        <MarkerF
            className="LakeMarker"
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
  
  
  

