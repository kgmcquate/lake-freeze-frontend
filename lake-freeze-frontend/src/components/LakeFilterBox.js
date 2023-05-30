import Slider from '@mui/material/Slider';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';

// import Button from 'react-bootstrap/Button';

import './LakeFilterBox'

import {DEFAULT_LAKE_COUNT_LIMIT, MAX_LAKE_COUNT_LIMIT} from './Map'


const Widget = styled('div')(({ theme }) => ({
    display: "flex",
    padding: "3%",
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(2px)',
    float: "left",
    fontFamily: ["Verdana"]
  }));


export function LakeFilterBox({onLimitChange}) {
    return (
        <Widget>
            <Grid container spacing={2} alignItems="center">
                {/* <Grid item> */}
                    <Typography id="input-slider" style={{fontFamily: ["Roboto"]}} gutterBottom>
                        Number of Lakes:
                    </Typography>
                    <Slider 
                        aria-label="Default" 
                        valueLabelDisplay="auto" 
                        onChange={(_, value) => onLimitChange(value)}
                        min={0}
                        max={MAX_LAKE_COUNT_LIMIT}
                        step={50}
                        defaultValue={DEFAULT_LAKE_COUNT_LIMIT}
                    />
                {/* </Grid> */}
            </Grid>
        </Widget>
    )
}
