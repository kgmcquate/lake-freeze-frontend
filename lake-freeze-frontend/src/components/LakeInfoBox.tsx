import React, { useEffect, useState } from 'react'

import { InfoWindow } from '@react-google-maps/api';
import '../styles/LakeInfoBox.css';
import { SATELLITE_IMAGE_PREFIX, ML_MODEL_INFO_URI, WEATHER_ETL_INFO_URI, SATELLITE_IMAGE_INFO_URI } from './Map'

import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { IconButton } from '@mui/material';
import Info from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

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
  
  const [iceInfoOpen, setIceInfoOpen] = React.useState(true);
  const [weatherInfoOpen, setWeatherInfoOpen] = React.useState(false);
  const [waterbodyInfoOpen, setWaterbodyInfoOpen] = React.useState(false);

  const [imageInfo, setImageInfo] = useState<WaterBodySatelliteImage | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather | null>(null);
  const [predictedWhiteFraction, setPredictedWhiteFraction] = useState<number | null>(null);


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

  

  useEffect(() => {
    async function fetchPredictedWhiteFraction() {
      if (date === null) {
        return
      }

      const response = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/predict_white_fraction?${new URLSearchParams({
          date: date.format("YYYY-MM-DD"),
          latitude: waterBodyInfo.lake.latitude,
          longitude: waterBodyInfo.lake.longitude          
        })}`
      );

      const predictedWhiteFraction: number = await response.json();

      setPredictedWhiteFraction(predictedWhiteFraction)
    }

    fetchPredictedWhiteFraction()
  },
  [date, waterBodyInfo]
  )


  // Build the image caption string
  var imageCaption = "Image"
  if (imageInfo && date) {
    const imageDate = dayjs(imageInfo.captured_ts)
    const imageTakenDays = date.diff(imageDate, 'day')
    const imageTakenDaysAbs = Math.abs(imageTakenDays)
    const dateStr = date?.format("YYYY-MM-DD")

    const daysWord = imageTakenDaysAbs === 1 ? "day" : "days"
 
    if (imageTakenDays > 0) {
      imageCaption += ` taken ${imageTakenDays} ${daysWord} before ${dateStr}`
    } else if (imageTakenDays < 0) {
      imageCaption += ` taken ${imageTakenDaysAbs} ${daysWord} after ${dateStr}`
    } else if (imageTakenDays === 0) {
      imageCaption += ` taken on ${dateStr}`
    }   
  }


  const innerElement = (
    <div className='lake-info-box' id='activebox'>
        {/* <h3>{waterBodyInfo.lake.name}</h3> */}
        <Typography variant="h6" component="h6" style={{marginBottom: "0px"}}>
          {waterBodyInfo.lake.name}
        </Typography>
        
        <Divider style={{margin: "3px"}}/>


        <List style={{marginLeft: "6px", padding: "2px", marginBlock: "0px"}} >
          <div>
            <ListItemButton onClick={() => setIceInfoOpen(!iceInfoOpen)} divider disableGutters className='list-button'> 
              {iceInfoOpen ? <ExpandLess /> : <ExpandMore />}
              <ListItemText primary="Snow and Ice Cover" />
            </ListItemButton>
            <Collapse in={iceInfoOpen} timeout="auto" unmountOnExit className='collapsible'>
              <List component="div" >
                {/* <li>Date: {waterBodyInfo.lakeWeatherReport?.date}</li> */}
                {waterBodyInfo.lakeWeatherReport && waterBodyInfo.lakeWeatherReport.ice_m > 0 ?
                  <ListItem>Ice Thickness (m): {waterBodyInfo.lakeWeatherReport?.ice_m.toFixed(2)}</ListItem> 
                  : null
                }
                {predictedWhiteFraction ?
                  
                  <ListItem>
                    Predicted Snow Cover (%): {(predictedWhiteFraction * 100).toFixed(0)}
                    <Tooltip title={"XGBoost model, click for more info"} placement="right" arrow leaveDelay={200}>
                      <a href={ML_MODEL_INFO_URI} target="_blank" rel="noreferrer" color='white'>
                        <IconButton size="small">
                          <Info/>
                        </IconButton>
                      </a>
                    </Tooltip>
                  </ListItem> 
                  : null
                }

                {imageInfo ?
                  <ListItem>Actual Snow Cover (on {dayjs(imageInfo.captured_ts).format("YYYY-MM-DD")}) (%): {(imageInfo.white_fraction * 100).toFixed(0)}</ListItem> 
                  : null
                }


              </List>

              {/* <Divider/> */}

                {thumbnailUrl ? 
                <ListItem style={{flexDirection: "column", fontSize: "small"}}>
                    
                  
                  <ListItemIcon>
                    <img 
                      src={thumbnailUrl} 
                      alt="Loading..." 
                      className='lake-info-img'
                    />
                  </ListItemIcon>
                  <div>
                    {imageCaption}
                    <Tooltip title={"From Google Earth API, click for info"} placement="right" arrow leaveDelay={200}>
                      <a href={SATELLITE_IMAGE_INFO_URI} target="_blank" rel="noreferrer" color='white'>
                        <IconButton size="small">
                          <Info/>
                        </IconButton>
                      </a>
                    </Tooltip>
                  </div>
                </ListItem> 
                : null}
                 

            </Collapse>
          </div>
          
          {dailyWeather ? 
            <div>
              <ListItemButton onClick={() => setWeatherInfoOpen(!weatherInfoOpen)} divider disableGutters className='list-button'>
                {weatherInfoOpen ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary="Weather" />
              </ListItemButton>

              <Collapse in={weatherInfoOpen} timeout="auto" unmountOnExit className='collapsible'>
                  
                    <List component="div" >
                      <ListItem>
                        Temperature (&deg;C): {(dailyWeather.temperature_2m_max + dailyWeather.temperature_2m_min / 2).toFixed(1)}
                      </ListItem> 

                      <ListItem>
                        Sunrise: {(dayjs(dailyWeather.sunrise)).format('h:mm A')}
                      </ListItem> 

                      <ListItem>
                        Sunset: {(dayjs(dailyWeather.sunset)).format('h:mm A')}
                      </ListItem>

                      {/* {dailyWeather.precipitation_sum != null ?
                        <ListItem>
                          Total Precipitation (cm): {(dailyWeather.precipitation_sum).toFixed(0)}
                        </ListItem>
                      : null
                      } */}

                      {dailyWeather.rain_sum != null ?
                        <ListItem>
                          Rain (cm): {(dailyWeather.rain_sum).toFixed(0)}
                        </ListItem>
                      : null
                      }

                      {dailyWeather.snowfall_sum != null ?
                        <ListItem>
                          Snowfall (cm): {(dailyWeather.snowfall_sum).toFixed(0)}
                        </ListItem>
                      : null
                      }

                      {dailyWeather.windspeed_10m_max != null ?
                        <ListItem>
                          Max Windspeed (km/h): {(dailyWeather.windspeed_10m_max).toFixed(0)}
                        </ListItem>
                      : null
                      }

                      <ListItem>
                        <Tooltip title={"From Open-Meteo API, click for info"} placement="right" arrow leaveDelay={200}>
                          <a href={WEATHER_ETL_INFO_URI} target="_blank" rel="noreferrer" color='white'>
                            <IconButton size="small">
                              <Info/>
                            </IconButton>
                          </a>
                        </Tooltip>
                      </ListItem> 
                    </List>

              </Collapse>

            </div>
            : null
          }          
          
          <div>
            <ListItemButton onClick={() => setWaterbodyInfoOpen(!waterbodyInfoOpen)} divider disableGutters className='list-button'>
              {waterbodyInfoOpen ? <ExpandLess /> : <ExpandMore />}
              <ListItemText primary="General" />
            </ListItemButton>

            <Collapse in={waterbodyInfoOpen} timeout="auto" unmountOnExit className='collapsible'>
              <List component="div" >

                {waterBodyInfo.lake.areasqkm ? 
                  <ListItem>
                    Surface Area (km<sup>2</sup>): {waterBodyInfo.lake.areasqkm.toFixed(1)}
                  </ListItem> 
                  : null
                }
                {waterBodyInfo.lake.max_depth_m ? 
                  <ListItem>
                    Max Depth (m): {waterBodyInfo.lake.max_depth_m.toFixed(1)}
                  </ListItem> 
                  : null
                }
                <ListItem>
                  Position: {Number(waterBodyInfo.lake.latitude).toFixed(3)}, {Number(waterBodyInfo.lake.longitude).toFixed(3)}
                </ListItem>
                </List>
              {/* <Divider/> */}
            </Collapse>

          </div>
          
          
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