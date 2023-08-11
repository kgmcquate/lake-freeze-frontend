import React, { useEffect, useState } from 'react'

import { InfoWindow } from '@react-google-maps/api';
import '../styles/LakeInfoBox.css';
import { SATELLITE_IMAGE_PREFIX } from './Map'

import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import { DailyWeather, WaterBodyInfo, WaterBodySatelliteImage } from './models'
import dayjs, { Dayjs } from 'dayjs';

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
export function LakeInfoBox({ 
    waterBodyInfo, 
    date,
    onCloseClick 
  }: { 
    waterBodyInfo: WaterBodyInfo; 
    date: Dayjs | null;
    onCloseClick: (marker: number | null) => void; 
  }) {

  const [imageInfo, setImageInfo] = useState<WaterBodySatelliteImage | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather | null>(null);


  useEffect(() => {
      async function fetchImageInfo() {
        // setLoading(true);
        if (date === null) {
          return
        }
        // Fetch lakes
        const response = await fetch(
          `${process.env.REACT_APP_LAKES_API_URL}/waterbody_image?${new URLSearchParams({
            waterbody_id: waterBodyInfo.lake.id.toString(),
            nearest_ts: date.toISOString()
          })}`
        );

        const imageInfo: WaterBodySatelliteImage | null = await response.json();

        setImageInfo(imageInfo)

        if (!imageInfo) {
          setThumbnailUrl(null)
          return
        }

        const imageUrl = `https://lake-freeze.kevin-mcquate.net/${SATELLITE_IMAGE_PREFIX}${imageInfo.thumbnail_filename}`
        
        // console.log(imageUrl)

        setThumbnailUrl(imageUrl)
      }

      fetchImageInfo()
    }, 
    [waterBodyInfo, date]
  );

  useEffect(() => {
    async function fetchDailyWeather() {
      if (date === null) {
        return
      }

      const response = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/get_daily_weather?${new URLSearchParams({
          latitude: waterBodyInfo.lake.latitude,
          longitude: waterBodyInfo.lake.longitude,
          date: date.format("YYYY-MM-DD")
        })}`
      );

      const dailyWeather: DailyWeather | null = await response.json();

      // console.log(dailyWeather)

      setDailyWeather(dailyWeather)
    }

    fetchDailyWeather()
  },
  [date, waterBodyInfo]
  )

  var imageCaption = "Satellite Image"
  if (imageInfo && date) {
    const imageDate = dayjs(imageInfo.captured_ts)
    const imageTakenDays = date.diff(imageDate, 'day')
    const imageTakenDaysAbs = Math.abs(imageTakenDays)
    const dateStr = date?.format("YYYY-MM-DD")

    const daysWord = imageTakenDaysAbs === 1 ? "day" : "days"
 
    if (imageTakenDays > 0) {
      imageCaption += ` (taken ${imageTakenDays} ${daysWord} before ${dateStr})`
    } else if (imageTakenDays < 0) {
      imageCaption += ` (taken ${imageTakenDaysAbs} ${daysWord} after ${dateStr})`
    } else if (imageTakenDays === 0) {
      imageCaption += ` (taken on ${dateStr})`
    }   
  }

  imageCaption += ":"

  const innerElement = (
    <div className='lake-info-box' id='activebox'>
        {/* <h3>{waterBodyInfo.lake.name}</h3> */}
        <Typography variant="h6" component="h6" style={{marginBottom: "0px"}}>
          {waterBodyInfo.lake.name}
        </Typography>
        <List style={{marginTop: "0px", padding: "0px", marginBlock: "0px"}}>
          {/* <li>Date: {waterBodyInfo.lakeWeatherReport?.date}</li> */}
          {waterBodyInfo.lakeWeatherReport && waterBodyInfo.lakeWeatherReport.ice_m > 0 ?
            <ListItem>Ice Thickness (m): {waterBodyInfo.lakeWeatherReport?.ice_m.toFixed(2)}</ListItem> 
            : null
          }
          {dailyWeather ? 
            <ListItem>
              Temperature (&deg;C): 
              {(dailyWeather.temperature_2m_max + dailyWeather.temperature_2m_min / 2).toFixed(1)}
            </ListItem> 
            : null
          }
          {waterBodyInfo.lake.areasqkm ? 
            <ListItem>
              Surface Area (km<sup>2</sup>): {waterBodyInfo.lake.areasqkm.toFixed(0)}
            </ListItem> 
            : null
          }
          {waterBodyInfo.lake.max_depth_m ? 
            <ListItem>
              Max Depth (m): {waterBodyInfo.lake.max_depth_m.toFixed(0)}
            </ListItem> 
            : null
          }
          <ListItem>
            Position: {Number(waterBodyInfo.lake.latitude).toFixed(3)}, {Number(waterBodyInfo.lake.longitude).toFixed(3)}
          </ListItem>
          {thumbnailUrl ? 
          <ListItem style={{flexDirection: "column"}}>
              {imageCaption}
            <Divider/>
            <ListItemIcon>
              <img 
                src={thumbnailUrl} 
                alt="Loading..." 
                style={{minWidth: 300, 
                  maxHeight: 300, 
                  borderRadius: "10px", 
                  border: "solid", 
                  borderColor: "gray", 
                  marginTop: "3%"}}
              />
            </ListItemIcon>
          </ListItem> 
          : null}
        </List>
      </div>
  )

  const infoWindow = (
    <InfoWindow
      position={{ lat: Number(waterBodyInfo.lake.latitude), lng: Number(waterBodyInfo.lake.longitude) }}
      onCloseClick={() => onCloseClick(null)}
      children={innerElement}
    />
  )
  
  
  return infoWindow;
}