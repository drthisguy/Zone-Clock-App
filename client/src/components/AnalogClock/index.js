import React, { useState, useEffect  } from 'react'

export function AnalogClock({ offset }) {

    const [ hands, setHands ] = useState({});

    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
        }, [offset])

    const { hourHand, minuteHand, secondHand } = hands,

    localClock = () => {

        const userTime = new Date(),

        //convert user time to local time.
            msOffset = offset * 3600,  // -> milliseconds
            utc = userTime.getTime() + (userTime.getTimezoneOffset() * 60000),
            localTime = new Date(utc + 1000 * msOffset);

        let localHours = localTime.getHours(),
            localMinutes = localTime.getMinutes(),
            localSeconds = localTime.getSeconds(),
        
        //Set the angle for each clock hand
            hourHand = localHours * 30 + (localMinutes/2),  // 360/12 = 30 + 15degrees for 30min (example)
            minuteHand = localMinutes * 6,  // 360/60 = 6
            secondHand = localSeconds * 6; // 360/60 = 6

         setHands({ hourHand, minuteHand, secondHand })
    }

    return (
        <div style={mount} >
            <ul style={analog}>
                <li><img src={require('../../assets/img/second-hand.png')} 
                    style={{...clockHands, transform: `rotate(${secondHand}deg)`, 
                    // margin:'45px 0 0 -32px',
                    top: '45px',
                    left: '113px',
                    zIndex:'2'}} 
                    /></li>
                <li><img src={require('../../assets/img/minute-hand.png')} 
                    style={{...clockHands, transform: `rotate(${minuteHand}deg)`, 
                    // margin:'40px 0 0 -32px', 
                    top: '40px',
                    right: '113px',
                    transformOrigin: '50% 77%', zIndex:'1'}} 
                    /></li> 
                <li><img src={require('../../assets/img/hour-hand.png')} 
                    style={{...clockHands, transform: `rotate(${hourHand}deg)`,
                    // margin:'47px 0 0 -32px', 
                    top: '45px',
                    left: '113px ',
                    transformOrigin: '50% 70%', 
                    zIndex:'0'}} 
                    /></li>
            </ul>
        </div>
    )
}

const mount = {
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
    backgroundImage: `url(${require("../../assets/img/clock-ABS.png")}`,
    backgroundSize: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    listStyle: 'none'
},
clockHands = {
    width: '25px',
    position: 'absolute',
    transformOrigin: '50% 64%',
}