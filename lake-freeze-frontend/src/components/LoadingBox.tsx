import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';

import './styles/LoadingBox.css'

export function LoadingBox() {
    return (
        <div className='loading-box'>
            Loading Weather Data...
            <CircularProgress className='loading-circle' size="100px"/>
        </div>
        
    )
}
