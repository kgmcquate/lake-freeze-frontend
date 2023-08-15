import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';

import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';

import '../styles/LoadingBox.css'

/**
 * LoadingBox component displays a loading indicator while weather data is being fetched.
 */
export function LoadingBox({
        isLoading
    }:{
        isLoading: boolean
    }) {

  
    return (
      <div>
        <Backdrop
            className='loading-box'
            open={isLoading}
        >
            <CircularProgress  className='loading-circle'/>
        </Backdrop>
      </div>
    );

    // return (
    //     <div className='loading-box'>
    //         Loading Weather Data...
    //         <CircularProgress className='loading-circle' size="100px" style={{marginTop: "30px"}}/>
    //     </div>
        
    // )
}
