import React, { useEffect, useState } from 'react'

import { InfoWindowF } from '@react-google-maps/api';
import '../styles/LakeInfoBox.css';
import { SATELLITE_IMAGE_PREFIX } from './Map'

import { WaterBodyInfo, WaterBodySatelliteImage } from './models'

/**
 * Formats the lake name to be human readable.
 *
 * @param lakeName - The name of the lake.
 * @returns The formatted lake name.
 */
// const formatLakeName = (lakeName: string) => {
//   return lakeName
//     .split(" ")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ") + " Lake";
// };


/**
 * LakeInfoBox component displays additional information about a lake in an InfoWindow.
 * It shows the lake's name, date, meters of ice, and position.
 *
 * @param waterBodyInfo - The weather report data for the lake.
 */
export function LakeInfoBox({ waterBodyInfo }: { waterBodyInfo: WaterBodyInfo }) {

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);


  useEffect(() => {
      async function fetchImageInfo() {
        // setLoading(true);

        // Fetch lakes
        const response = await fetch(
          `${process.env.REACT_APP_LAKES_API_URL}/waterbody_image?${new URLSearchParams({
            waterbody_id: waterBodyInfo.lake.id.toString(),

          })}`
        );

        const image: WaterBodySatelliteImage | null = await response.json();
        const imageUrl = `${SATELLITE_IMAGE_PREFIX}${image?.thumbnail_filename}`
        console.log(imageUrl)

        setThumbnailUrl(`${SATELLITE_IMAGE_PREFIX}${image?.thumbnail_filename}`)
      }

      fetchImageInfo()
    }, 
    [waterBodyInfo]
  );
  

  return (
    <div className='lake-info-box'>
      <InfoWindowF
        position={{ lat: Number(waterBodyInfo.lake.latitude), lng: Number(waterBodyInfo.lake.longitude) }}
        
      >
        <div style={{ fontFamily: "Roboto" }}>
          <h2>{waterBodyInfo.lake.name}</h2>
          <ul>
            <li>Date: {waterBodyInfo.lakeWeatherReport?.date}</li>
            <li>Ice Thickness (m): {waterBodyInfo.lakeWeatherReport?.ice_m.toFixed(2)}</li>
            {waterBodyInfo.lake.areasqkm ? <li>Surface Area (km<sup>2</sup>): {waterBodyInfo.lake.areasqkm}</li> : null}
            {waterBodyInfo.lake.max_depth_m ? <li>Max Depth (m): {waterBodyInfo.lake.max_depth_m}</li> : null}
            <li>Position: {waterBodyInfo.lake.latitude},{waterBodyInfo.lake.longitude}</li>
            {thumbnailUrl ? <img src={thumbnailUrl} alt="Loading..."/> : null}
          </ul>
        </div>
      </InfoWindowF>
    </div>
  );
}