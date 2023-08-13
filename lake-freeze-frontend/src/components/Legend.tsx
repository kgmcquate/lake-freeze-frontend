import React from 'react'


// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'


import Divider from '@mui/material/Divider';

import '../styles/Map.css';
import '../styles/Legend.css';

export function Legend() {
    return (
        
        // <Grid 
        //     container 
        //     direction="row"
        //     justifyContent="center"
        //     alignItems="center" 
        //     columns={16}
        //     className='legend'
        //     columnSpacing={"12px"}
        // >
        //     {/* <Grid > */}
        //         <Grid item xs={"auto"}>
        //             <Item>
        //                 <img src='lake.svg' width={"30px"}/>= liquid
        //             </Item>
        //         </Grid>
        //         <Grid item xs={"auto"}>
        //             <Item>
        //         <img src='lake-frozen.svg' width={"30px"}/>= frozen</Item>
        //         </Grid>
                
        //     {/* </Grid> */}
        // </Grid>

        <div className='legend'>
            Legend

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
            cluster
                <div>
                    <img src='cluster-circle.svg' width={"30px"}/>
                    
                </div>
            </div>       

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
                liquid
                <div>
                    <img src='lake.svg' width={"30px"}/>
                </div>
            </div>

            <Divider style={{margin: "3px"}} orientation="vertical" flexItem/>
            <div>
            frozen
                <div>
                    <img src='lake-frozen.svg' width={"30px"}/>
                </div>
            </div>

   
        </div>
    )
}