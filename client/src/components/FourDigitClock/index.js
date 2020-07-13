import React, { useState, useEffect } from 'react';
import { getLocalTime } from '../../utils/Helpers';

export function FourDigitClock({ offset }) {

    const [ timeString, setTimeString ] = useState('12:00am');

    useEffect(() => {
        const localClock = () => {

            let { localHours, localMinutes } = getLocalTime(offset);
    
                localMinutes = (localMinutes < 10 ? '0' : '') + localMinutes;
    
            const timeOfDay = localHours < 12  ? 'am' : 'pm';
                localHours = localHours > 12  ? localHours - 12 : localHours;
                localHours = localHours === 0  ? 12 : localHours;
    
            const localTimeString = `${localHours}:${localMinutes}${timeOfDay}`;
            setTimeString(localTimeString);   
        }  
        const timer = setInterval(localClock, 1000)  
            return () => clearInterval(timer)
    }, [offset])


    return (
        <div>
            {timeString}
        </div>
    )
}
