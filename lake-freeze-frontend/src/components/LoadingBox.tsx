import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';

import '../styles/LoadingBox.css'

/**
 * LoadingBox component displays a loading indicator while weather data is being fetched.
 */
export function LoadingBox() {
    return (
        <div className='loading-box'>
            Loading Weather Data...
            <CircularProgress className='loading-circle' size="100px"/>
        </div>
        
    )
}
