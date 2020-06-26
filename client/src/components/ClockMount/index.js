import React from 'react';



export default function ClockMount() { 

    const AnalogClock = () => {
      return (
          <div style={dial}>

          </div>
      )
     }


return (
    <div style={background}>
        <div style={{height: '1px'}}></div>
        <AnalogClock />
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
}, 
dial = {
    backgroundImage: `url(${require("../../assets/img/DialS.png")}`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '14.8%',
    height: '180px',
    marginLeft: '133px',
    marginTop: '36px',
}