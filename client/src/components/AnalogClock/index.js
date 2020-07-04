import React, { useState, useEffect  } from 'react'

export function AnalogClock({ offset }) {

    const [ hands, setHands ] = useState({});

    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
        }, [offset])


    const formatTime = time => {
        console.log(time)
        return time < 10 ? `0${time}` : time},

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
            <div style={analog}>
                <img src={require('../../assets/img/second-hand.png')} style={{...clockHands, transform: `rotate(${secondHand * 6}deg)`}} />
                <div style={{...clockHands, transform: `rotate(${minuteHand * 6}deg)`}} />
                <div style={{...clockHands, transform: `rotate(${hourHand * 30}deg)`}} />             
            </div>
        </div>
    )
}

const mount = {
    // width: '400px',  
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
analog = {
    width: '250px',
    height: '250px',
    position: 'relative',
    backgroundImage: `url(${require("../../assets/img/clock-ABS.png")}`,
    backgroundSize: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
},
clockHands = {
    width: '10px',
    position: 'absolute',
    transformOrigin: 'bottom left'
}