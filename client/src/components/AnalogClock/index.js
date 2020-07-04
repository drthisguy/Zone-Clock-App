import React, { useState, useEffect  } from 'react'

export function AnalogClock({ offset }) {

    const [ hands, setHands ] = useState({});

    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
        }, [offset])


    const formatTime = time => time < 10 ? `0${time}` : time,

    localClock = () => {
        const date = new Date();
        date.setHours(date.getHours() + offset);
        let hourHand = formatTime(date.getHours()),
         minuteHand = formatTime(date.getMinutes()),
         secondHand = formatTime(date.getSeconds());
         setHands({ hourHand, minuteHand, secondHand })
    }

    const { hourHand, minuteHand, secondHand } = hands;

    return (
        <div style={mount} >
            <ul style={analog}>
                <li><img src={require('../../assets/img/second-hand.png')} style={{...clockHands, transform: `rotate(${secondHand * 6}deg)`}} /></li>
                {/* <div style={{...clockHands, transform: `rotate(${minuteHand * 6}deg)`}} />
                <div style={{...clockHands, transform: `rotate(${hourHand * 30}deg)`}} />              */}
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
    alignItems: 'center',
},
analog = {
    minWidth: '100%',
    minHeight: '100%',
    position: 'relative',
    backgroundImage: `url(${require("../../assets/img/clock-ABS.png")}`,
    backgroundSize: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
},
clockHands = {
    width: '27px',
    margin:'37px 0 0 -35px',
    position: 'absolute',
    transformOrigin: '50% 65%',
}