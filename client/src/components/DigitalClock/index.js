import React, { useState, useEffect } from 'react';


export function DigitalClock({ offset }) {

    const [ cityTime, setCityTime ] = useState('12:00:00 AM');
    
    useEffect(() => {
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
        }, [offset])

    const localClock = () => {
        const userTime = new Date(),

            //convert user time to local time.
            msOffset = offset * 3600,  // -> milliseconds
            utc = userTime.getTime() + (userTime.getTimezoneOffset() * 60000),
            localTime = new Date(utc + 1000 * msOffset);
        
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


    return (
        <div>
            <h2>{cityTime}</h2>
        </div>
    )
}
