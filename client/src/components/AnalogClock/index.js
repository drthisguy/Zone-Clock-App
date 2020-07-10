import React, { useState, useEffect  } from 'react';
import { getLocalTime } from '../../utils/Helpers';

export function AnalogClock({ offset }) {

    const [ hands, setHands ] = useState({});

    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
    }, [offset])

    let { hourHand, minuteHand, secondHand } = hands,

    localClock = () => {

        let { localHours, localMinutes, localSeconds } = getLocalTime(offset),
        
        //Set the angle for each clock hand
            hourHand = localHours * 30 + (localMinutes/2),  // 360/12 = 30 + 15degrees for 30min (example)
            minuteHand = localMinutes * 6,  // 360/60 = 6
            secondHand = localSeconds * 6; // 360/60 = 6

         setHands({ hourHand, minuteHand, secondHand })
    }

    return (
        <div style={mount} >
            <ul style={analog}>
                <li>
                    <img src={require('../../assets/img/hour-hand-ds.png')} 
                    style={{...hrHand, transform: `rotate(${hourHand}deg)`}} 
                    />
                </li>
                <li>
                    <img src={require('../../assets/img/minute-hand_ds.png')} 
                    style={{...minHand, transform: `rotate(${minuteHand}deg)`}} 
                    />
                </li> 
                <li>
                    <img src={require('../../assets/img/second-hand_ds.png')} 
                    style={{...secHand, transform: `rotate(${secondHand}deg)`}} 
                    />
                </li>
            </ul>
        </div>
    )
}

let mount = {
    width: '250px',  
    height: '250px',
    textAlign: 'center',    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
},
analog = {
    minWidth: '100%',
    minHeight: '100%',
    position: 'relative',
    listStyle: 'none',
    backgroundSize: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${require("../../assets/img/clock-ABS.png")}`
},
lgHr = {
    width: '25px',
    top: '49px',
    left: '112px ',
    position: 'absolute',
    transformOrigin: '50% 69%', 
    zIndex:'0'
},
lgMin = {
    width: '25px',
    top: '37px',
    left: '113px',
    position: 'absolute',
    transformOrigin: '50% 78%', 
    zIndex:'1'
},
lgSec = {
    width: '25px',
    top: '45px',
    left: '113px',
    position: 'absolute',
    transformOrigin: '50% 63%',
    zIndex:'2'
},
smHr = {...lgHr, width:'20px', top:'40px', left:'89px'},
smMin = {...lgMin, width:'20px', top:'34px', left:'90px'},
smSec = {...lgSec, width:'20px', top:'38px', left:'90px'},
hrHand = window.innerWidth > 1200 ?  lgHr : smHr,
minHand = window.innerWidth > 1200 ?  lgMin : smMin,
secHand = window.innerWidth > 1200 ?  lgSec : smSec;
mount = window.innerWidth > 1200 ?  mount : {...mount, width: '200px', height: '200px'} ;
analog = window.innerWidth > 1200 ?  analog : {...analog, backgroundSize: '200px'} ;