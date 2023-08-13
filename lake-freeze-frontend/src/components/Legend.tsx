import React from 'react'

import Divider from '@mui/material/Divider';

import '../styles/Map.css';
import '../styles/Legend.css';

export function Legend() {
    return (
        <div className='legend'>
            Legend

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
                cluster
                <div>
                    <img src={`${process.env.PUBLIC_URL}/cluster-circle.svg`} width={"30px"} alt=""/>
                    
                </div>
            </div>       

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
                liquid
                <div>
                    <img src={`${process.env.PUBLIC_URL}/lake.svg`} width={"30px"} alt=""/>
                </div>
            </div>

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
                frozen
                <div>
                    <img src={`${process.env.PUBLIC_URL}/lake-frozen.svg`} width={"30px"} alt=""/>
                </div>
            </div>
        </div>
    )
}