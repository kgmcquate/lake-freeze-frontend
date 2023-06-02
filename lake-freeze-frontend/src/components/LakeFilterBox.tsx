import React from 'react'

import Slider from '@mui/material/Slider';
import '../styles/LakeFilterBox.css';
import { DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT } from './Map';

export function LakeFilterBox({ onLimitChange }: { onLimitChange: (value: number) => void }) {
  return (
    <div className='lake-filter-box'>
      <label>Number of Lakes:</label>
      <Slider
        className='slider'
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(_, value) => onLimitChange(value as number)}
        min={0}
        max={MAX_LAKE_COUNT_LIMIT}
        step={50}
        defaultValue={DEFAULT_LAKE_COUNT_LIMIT}
      />
    </div>
  );
}