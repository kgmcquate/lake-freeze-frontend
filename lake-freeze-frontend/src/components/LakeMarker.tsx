import {MarkerF} from '@react-google-maps/api';
import { Clusterer } from '@react-google-maps/marker-clusterer/';

import {useState} from 'react';

import { LakeInfoBox } from './LakeInfoBox';

import './styles/LakeMarker.css'

import { Lake, LakeWeatherReport } from './models'

// const frozenIcon = 'bi:snow'

const icePngUrl = "https://img.icons8.com/emoji/24/000000/ice.png";
const waterPngUrl = "https://img.icons8.com/color/24/000000/water.png";

export function LakeMarker({ lake_weather_report, clusterer }: { lake_weather_report: LakeWeatherReport; clusterer: Clusterer }) {
    const [lakeMarkerInfo, setLakeMarkerInfo] = useState(null);

    return (
      <Marker
        className="LakeMarker"
        position={{ lat: lake_weather_report.latitude, lng: lake_weather_report.longitude }}
        icon={{
          url: lake_weather_report.is_frozen ? icePngUrl : waterPngUrl
        }}
        onMouseOver={() => setLakeMarkerInfo(lake_weather_report)}
        onMouseOut={() => setLakeMarkerInfo(null)}
        clusterer={clusterer}
      >
        {lakeMarkerInfo && <LakeInfoBox lake_weather_report={lakeMarkerInfo} />}
      </Marker>
    );
  }
  
  

