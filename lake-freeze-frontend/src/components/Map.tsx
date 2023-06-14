import React from 'react';
import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { LakeMarker } from './LakeMarker';
import { LakeFilterBox } from './LakeFilterBox';
import { LoadingBox } from './LoadingBox';
import { mapStyles, clusterStyles } from './mapStyles';
import { Lake, LakeWeatherReport } from './models';
import '../styles/Map.css';

/**
 * Calculates the average value of an array.
 * @param arr - Array of numbers
 * @returns Average value
 */
const getAvg = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

export const DEFAULT_LAKE_COUNT_LIMIT = 200;
export const MAX_LAKE_COUNT_LIMIT = 500;
const DEFAULT_ZOOM = 7;

/**
 * Map component responsible for displaying the Google Map and markers.
 */
const Map: React.FunctionComponent = () => {
  const [lakeWeatherReports, setLakeWeatherReports] = useState<LakeWeatherReport[]>([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const zoom = DEFAULT_ZOOM;
  const [loading, setLoading] = useState(false);
  const [lakeCountLimit, setLakeCountLimit] = useState(DEFAULT_LAKE_COUNT_LIMIT);

  useEffect(() => {
    async function fetchLakes() {
      setLoading(true);

      // Fetch lakes
      const response = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/lakes?${new URLSearchParams({
          limit: lakeCountLimit.toString(),
        })}`
      );
      const lakes: Lake[] = await response.json();

      const avgLat = getAvg(lakes.map((lake) =>  Number(lake.latitude) || 0));
      const avgLng = getAvg(lakes.map((lake) =>  Number(lake.longitude) || 0));
      if (!isNaN(avgLat) && !isNaN(avgLng)) {
        setCenter({ lat: avgLat, lng: avgLng });
      }

      const minLat = Math.min(...lakes.map((lake) => Number(lake.latitude) || 0));
      const minLng = Math.min(...lakes.map((lake) => Number(lake.longitude) || 0));
      const maxLat = Math.max(...lakes.map((lake) => Number(lake.latitude) || 0));
      const maxLng = Math.max(...lakes.map((lake) => Number(lake.longitude) || 0));

      // Fetch weather reports
      const weatherReportResponse = await fetch(
        `${process.env.REACT_APP_LAKES_API_URL}/lake_weather_reports?${new URLSearchParams({
          lake_ids: lakes.map((lake) => lake.id).join(","),
          min_latitude: minLat.toString(),
          max_latitude: maxLat.toString(),
          min_longitude: minLng.toString(),
          max_longitude: maxLng.toString(),
          limit: lakeCountLimit.toString(),
        })}`
      );
      const reportsData: LakeWeatherReport[] = await weatherReportResponse.json();

      setLakeWeatherReports(reportsData);
      setLoading(false);
    }

    fetchLakes();
  }, [lakeCountLimit]);

  /**
   * Event handler for the limit change in the LakeFilterBox component.
   * @param value - New limit value
   */
  const onLimitChange = (value: number) => {
    setLakeCountLimit(value);
  };

  return (
    <div>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName="map-container"
        options={{
          mapTypeControl: false, //Remove ability to change map type
          streetViewControl: false,
          mapTypeId: 'hybrid', // hybrid is satellite images with streets and stuff overlaid
          backgroundColor: 'black',
          styles: mapStyles,
        }}
      >
        {loading ? <LoadingBox /> : null}
        <LakeFilterBox onLimitChange={onLimitChange} />
        <MarkerClusterer styles={clusterStyles}>
          {(clusterer) => (
            <div>
              {lakeWeatherReports?.map((lake_weather_report) => (
                <LakeMarker
                  key={lake_weather_report.lake_id}
                  lake_weather_report={lake_weather_report}
                  clusterer={clusterer}
                />
              ))}
            </div>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default Map;