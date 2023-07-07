
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
  date: DateTime;
  latitude: string;
  longitude: string;
  nearby_city_name: string;
  state_or_province: string;
  country: string;
  max_temp_c: number;
  min_temp_c: number;
  avg_temp_c: number;
  max_wind_kph: number;
  total_precip_mm: number;
  avg_visibility_km: number;
  avg_humidity: number;
  uv: number;
  last_updated_ts?: DateTime;
}

export interface WaterBodyWeatherReport {
  water_body_id: number;
  date: DateTime;
  ice_alg_version: string;
  ice_m: number;
  is_frozen: boolean;
  latitude: number;
  longitude: number;
  water_body_name: string;
  last_updated_ts?: DateTime;
}

export interface LakeInfo {
  lake: WaterBody
  lakeWeatherReport?: WaterBodyWeatherReport
}