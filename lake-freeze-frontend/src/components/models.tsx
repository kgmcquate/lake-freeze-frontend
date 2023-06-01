
// import { DateTime } from "luxon";
// Define datetime type as string
type DateTime = string

export interface Lake {
    id?: number;
    lake_name: string;
    latitude?: number;
    longitude?: number;
    nearby_city_name?: string;
    state_or_province?: string;
    country?: string;
    nearby_city_latitude?: number;
    nearby_city_longitude?: number;
    max_depth_m?: number;
    surface_area_m2?: number;
  }
  
  export interface WeatherByDay {
    date: DateTime;
    latitude: number;
    longitude: number;
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
  
  export interface LakeWeatherReport {
    lake_id: number;
    date: DateTime;
    ice_alg_version: string;
    ice_m: number;
    is_frozen: boolean;
    latitude: number;
    longitude: number;
    lake_name: string;
    last_updated_ts?: DateTime;
  }