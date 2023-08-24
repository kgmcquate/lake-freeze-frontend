import React from 'react'

import { Dayjs } from 'dayjs';

import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
// import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import '../styles/LakeFilterBox.css';
import '../styles/Map.css';

import { getHexColor } from '../styles/mapStyles';

import { DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT, WEBSITE_INFO_URI, HOME_URL } from './Map';
import { debounce } from './debounce';

import { IconButton } from '@mui/material';
import Info from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

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
  const [isOpen, setOpen] = React.useState(true);



  return (
    <div className='lake-filter-box'>

      <ListItemButton onClick={() => setOpen(!isOpen)} divider disableGutters className='list-button'>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Filters" />
      </ListItemButton >

      <Collapse in={isOpen} timeout="auto" unmountOnExit className='collapsible'  >
        <div style={{height: "200px" ,display: "flex", flexDirection: "column", alignItems: "stretch"}}>
          <div style={{marginBottom: "10px"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  label="Date"
                  value={date}
                  onChange={setDate}
                  format="YYYY-MM-DD"
              />
            </LocalizationProvider>
          </div>

          <Divider style={{marginBottom: "10px"}}/>
          
          <div style={{marginBottom: "10px"}}>
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

          <Divider style={{marginBottom: "10px"}}/>

          <div style={{marginBottom: "0px", padding: "0px", alignSelf: "center"}}>
            Created by <a href={HOME_URL} target='_blank' rel="noreferrer" style={{color: getHexColor("--primary-highlight-color")}}>Kevin McQuate</a>
            <Tooltip title={"Written in React.js, click for more info"} placement="right" arrow leaveDelay={200}>
              <a href={WEBSITE_INFO_URI} target="_blank" rel="noreferrer" color='white'>
                <IconButton size="small">
                  <Info/>
                </IconButton>
              </a>
            </Tooltip>
          </div>
        </div>

      </Collapse>

    </div>
  );
}