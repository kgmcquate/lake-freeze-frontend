
// import { DateTime } from "luxon";
// Define datetime type as string
type DateTime = string

export interface WaterBody {
  id: number;
  longitude: string;
  latitude: string;
  name: string;
  max_depth_m?: number | null;
  areasqkm?: number | null;
  elevation?: number | null;
  min_latitude?: number | null;
  max_latitude?: number | null;
  min_longitude?: number | null;
  max_longitude?: number | null;
}
  
export interface DailyWeather {
  date: string;
  latitude: string;
  longitude: string;
  timezone: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
  uv_index_max: number;
  uv_index_clear_sky_max?: number | null;
  precipitation_sum?: number | null;
  rain_sum?: number | null;
  showers_sum?: number | null;
  snowfall_sum?: number | null;
  precipitation_hours?: number | null;
  precipitation_probability_max?: number | null;
  windspeed_10m_max?: number | null;
  windgusts_10m_max?: number | null;
  winddirection_10m_dominant?: number | null;
  shortwave_radiation_sum?: number | null;
  et0_fao_evapotranspiration?: number | null;
}

export interface WaterBodyWeatherReport {
  waterbody_id: number;
  date: DateTime;
  ice_alg_version: string;
  ice_m: number;
  is_frozen: boolean;
  latitude: number;
  longitude: number;
  water_body_name: string;
  last_updated_ts?: DateTime;
}

export interface WaterBodyInfo {
  lake: WaterBody
  lakeWeatherReport?: WaterBodyWeatherReport
}


export interface WaterBodySatelliteImage {
  waterbody_id: number;
  captured_ts: string; // ISO 8601 formatted string
  satellite_dataset: string;
  ee_id: string;
  properties: string | null;
  filename: string;
  thumbnail_filename: string;
  red_average: number;
  green_average: number;
  blue_average: number;
  white_fraction: number;
}