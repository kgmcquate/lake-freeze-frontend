import Slider from '@mui/material/Slider';


import './LakeFilterBox.css'

import {DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT} from './Map'


export function LakeFilterBox({onLimitChange}) {
    return (
        <div className='lake-filter-box'>
            {/* <Grid container spacing={2} alignItems="center">
                <Grid item> */}
                    <label>Number of Lakes:</label>                    
                    <Slider 
                        className='slider'
                        // color="success.main"
                        aria-label="Default" 
                        valueLabelDisplay="auto" 
                        onChange={(_, value) => onLimitChange(value)}
                        // marks={[{value: 0, display: '0'}, {value: MAX_LAKE_COUNT_LIMIT, display: MAX_LAKE_COUNT_LIMIT}]}
                        // getAriaValueText={valuetext}
                        min={0}
                        max={MAX_LAKE_COUNT_LIMIT}
                        step={50}
                        defaultValue={DEFAULT_LAKE_COUNT_LIMIT}
                    />
                {/* </Grid>
            </Grid> */}
        </div>
    )
}
