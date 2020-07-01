import React, { useState } from 'react'

export function DigitalClock({ offset }) {
console.log("DigitalClock -> offset", offset)

    const [ cityTime, setCityTime ] = useState('12:00:00 AM'),


    localClock = () => {
      
        const userTime = new Date(),

            //convert user time to local time.
            utc = userTime.getTime() + (userTime.getTimezoneOffset() * 1000),
            localTime = new Date(utc + 1000 * (offset*60));
            console.log("localClock -> localTime", userTime.getTimezoneOffset(), userTime.getTime())
        
        let localHours = localTime.getHours(),
            localMinutes = localTime.getMinutes(),
            localSeconds = localTime.getSeconds();

            localMinutes = (localMinutes < 10 ? '0' : '') + localMinutes;
            localSeconds = (localSeconds < 10 ? '0' : '') + localSeconds;

        const timeOfDay = localHours < 12  ? 'AM' : 'PM';
            localHours = localHours > 12  ? localHours - 12 : localHours;
            localHours = localHours == 0  ? 12 : localHours;

        const localTimeString = localHours + ':' + localMinutes + ':' + localSeconds + ' ' + timeOfDay;
        setCityTime(localTimeString);
    }

    setInterval(localClock, 1000);    

    return (
        <div>
            <h2>{cityTime}</h2>
        </div>
    )
}
