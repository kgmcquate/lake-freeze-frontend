import Slider from '@mui/material/Slider';

import './LakeFilterBox'

import {DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT} from './Map'

export function LakeFilterBox({onLimitChange}) {
    return (
    <div style={{
        width: "15%",
        height: "10%",
        backgroundColor: "white",
        zIndex: 0,
        position: "absolute"
    }}>
        Limit:
        <Slider 
            aria-label="Default" 
            valueLabelDisplay="auto" 
            onChange={(_, value) => onLimitChange(value)}
            min={0}
            max={MAX_LAKE_COUNT_LIMIT}
            step={10}
            defaultValue={DEFAULT_LAKE_COUNT_LIMIT}
        />
    </div>
    )
}
