import React, { useState, useEffect } from 'react';
import { getLocalTime } from '../../utils/Helpers';

export function DigitalClock({ offset }) {

    const [ timeString, setTimeString ] = useState('12:00:00 AM');
    
    useEffect(() => {
        const timer = setInterval(localClock, 250)  
            return () => clearInterval(timer)
    }, [offset])

    const localClock = () => {
        let { localHours, localMinutes, localSeconds } = getLocalTime(offset);

            localMinutes = (localMinutes < 10 ? '0' : '') + localMinutes;
            localSeconds = (localSeconds < 10 ? '0' : '') + localSeconds;

        const timeOfDay = localHours < 12  ? 'AM' : 'PM';
            localHours = localHours > 12  ? localHours - 12 : localHours;
            localHours = localHours === 0  ? 12 : localHours;

        const localTimeString = localHours + ':' + localMinutes + ':' + localSeconds + ' ' + timeOfDay;
        setTimeString(localTimeString);   
    }  


    return (
        <div>
            <h2>{timeString}</h2>
        </div>
    )
}
