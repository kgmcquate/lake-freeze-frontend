import React from 'react'

import { Dayjs } from 'dayjs';

import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import '../styles/LakeFilterBox.css';
import '../styles/Map.css';
import { DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT } from './Map';
import { debounce } from './debounce';


/**
 * LakeFilterBox component provides a slider to filter the number of lakes displayed on the map.
 *
 * @param onLimitChange - Callback function to handle the change in lake count limit.
 */
export function LakeFilterBox({ 
    onLimitChange, 
    date,
    setDate 
  }: 
  { 
    onLimitChange: (value: number) => void,
    date: Dayjs | null,
    setDate: (value: Dayjs | null) => void 
  }) {

  const debouncedOnLimitChange = debounce(onLimitChange, 200)

  return (
    <div className='lake-filter-box'>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              label="Date"
              value={date}
              onChange={setDate}
              format="YYYY-MM-DD"
          />
        </LocalizationProvider>
      </div>

      <Divider style={{margin: "3px"}} />
      
      <div>
        <label id="num-lakes-label" style={{marginLeft: "3px" }}>Number of Lakes:</label>
        <Slider
          aria-labelledby="num-lakes-label"
          aria-label="Number of Lakes:"
          valueLabelDisplay="auto"
          onChangeCommitted={(_, value) => debouncedOnLimitChange(value as number)}     
          color='primary'     
          min={0}
          max={MAX_LAKE_COUNT_LIMIT}
          step={50}
          defaultValue={DEFAULT_LAKE_COUNT_LIMIT}
        />
      </div>
    </div>
  );
}