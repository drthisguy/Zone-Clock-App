import React, { useState, useEffect } from 'react';
import { getLocalTime } from '../../utils/Helpers';

export function ZoneClocks({ offset, position }) {

    const [ hands, setHands ] = useState({});

    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
    }, [offset])

    const { hourHand, minuteHand, secondHand } = hands,

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
            <ul style={{...analog, left: position.left, top: position.top }}>
                <li>
                    <img src={require('../../assets/img/hour-hand.png')} 
                    style={{...hrHand, transform: `rotate(${hourHand}deg)`}} 
                    />
                </li>
                <li>
                    <img src={require('../../assets/img/minute-hand.png')} 
                    style={{...minHand, transform: `rotate(${minuteHand}deg)`}} 
                    />
                </li> 
                <li>
                    <img src={require('../../assets/img/second-hand.png')} 
                    style={{...secHand, transform: `rotate(${secondHand}deg)`}} 
                    />
                </li>
            </ul>
        </div>
    )
}

const mount = {
    width: '230',  
    height: '230',
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
    backgroundSize: '230',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${require("../../assets/img/DialA.png")}`
},
hour = {
    width: '15px',
    top: '48px',
    left: '114px ',
    position: 'absolute',
    transformOrigin: '50% 69%', 
    zIndex:'0'
},
min = {
    width: '15px',
    top: '43px',
    left: '114px',
    position: 'absolute',
    transformOrigin: '50% 78%', 
    zIndex:'1'
},
sec = {
    width: '15px',
    top: '47px',
    left: '114px',
    position: 'absolute',
    transformOrigin: '50% 63%',
    zIndex:'2'
},
hrHand = window.innerWidth > 1200 ?  hour : {...hour, width: '12px'} ,
minHand = window.innerWidth > 1200 ?  min : {...min, width: '12px'} ,
secHand = window.innerWidth > 1200 ?  sec : {...sec, width: '12px'}