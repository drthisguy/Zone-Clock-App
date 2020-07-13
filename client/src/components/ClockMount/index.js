import React from 'react';
import { ZoneClocks } from '../ZoneClocks';

export function ClockMount() { 

    /* zone clock offsets with an attempt to estimate Daylight Savings changes. 
    Doesn't seem worth the 5 API calls, when loading, for better accuracy.  */
    const sydneyOffset = (new Date().getMonth() > 3 && new Date().getMonth() < 9) ? 10 : 11,
     nyOffset = (new Date().getMonth() > 2 && new Date().getMonth() < 10) ? -4 : -5,
     londonOffset = (new Date().getMonth() > 2 && new Date().getMonth() < 10) ? 1 : 0,
     dubaiOffset = 4, 
     tokyoOffset = 9;

     //Return still, clock image for smaller screen sizes.
     if (window.innerWidth < 992) {
         return <div style={{...background, 
            backgroundImage:`url(${require("../../assets/img/Sapling-Round-Still-Zone-Clock-Brushed-Aluminum.png")}`}} 
            />
     }
    return (
        <div style={background}>
            <ZoneClocks offset={sydneyOffset} position={window.innerWidth > 1200 ? wideSydney : smallSydney} />
            <ZoneClocks offset={nyOffset} position={window.innerWidth > 1200 ? wideNY : smallNY} />
            <ZoneClocks offset={londonOffset} position={window.innerWidth > 1200 ? wideLond : smallLond} />
            <ZoneClocks offset={dubaiOffset} position={window.innerWidth > 1200 ? wideDub : smallDub} />
            <ZoneClocks offset={tokyoOffset} position={window.innerWidth > 1200 ? wideTok : smallTok} />
        </div>
    )
}

const background = {
    backgroundImage: `url(${require("../../assets/img/Sapling-RoundMount.png")}`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    overflow: 'hidden',
    height: '260px',
    marginTop: '30px'
},
wideSydney = {
    left: '86px', 
    top: '15px'
},
smallSydney = {
    left: '53px', 
    top: '28px'
},
wideNY = {
    left: '260px', 
    top: '-2px'
},
smallNY = {
    left: '200px', 
    top: '11px'
},
wideLond = {
    left: '431px', 
    top: '-18px'
},
smallLond = {
    left: '342px', 
    top: '-5px'
},
wideDub = {
    left: '608px', 
    top: '-35px'
},
smallDub = {
    left: '490px', 
    top: '-22px'
},
wideTok = {
    left: '784px', 
    top: '-51px'
},
smallTok = {
    left: '638px', 
    top: '-39px'
}
