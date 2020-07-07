import React from 'react';
import { ZoneClocks } from '../ZoneClocks';

export function ClockMount() { 

    /* zone clock offsets with an attempt to estimate Daylight Savings changes. 
    Doesn't seem worth the 5 API calls, when loading, for more accuracy.  */
    const sydneyOffset = (new Date().getMonth() > 3 && new Date().getMonth() < 9) ? 10 : 11,
     nyOffset = (new Date().getMonth() > 2 && new Date().getMonth() < 10) ? -4 : -5,
     londonOffset = (new Date().getMonth() > 2 && new Date().getMonth() < 10) ? 1 : 0,
     dubaiOffset = 4, 
     tokyoOffset = 9;


    return (
        <div style={background}>
            <ZoneClocks offset={sydneyOffset} position={{left: '86px', top: '15px'}} />
            <ZoneClocks offset={nyOffset} position={{left: '261px', top: '-3px'}} />
            <ZoneClocks offset={londonOffset} position={{left: '430px', top: '-15px'}} />
            <ZoneClocks offset={dubaiOffset} position={{left: '610px', top: '-35px'}} />
            <ZoneClocks offset={tokyoOffset} position={{left: '783px', top: '-50px'}} />
        </div>
    )
}

const background = {
    backgroundImage: `url(${require("../../assets/img/Sapling-RoundMount.png")}`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    height: '260px',
    marginTop: '30px'
}