import React from 'react';

export const FormatZone = (zone) => {

    const zoneName = zone.zoneName;

    //get real offset in hours
    const dst = zone.dst == 1 ? 'On' : 'Off',
     rawOffset = zone.gmtOffset/3600,
     preOff = dst === 'On' ? rawOffset - 1 : rawOffset;
    let offset = Math.floor(preOff);
     offset = offset > 0 ? '+'+ offset : offset;

    //workout the bias offset in seconds
    let bias = Math.abs(preOff);
     bias = (bias - Math.floor(bias))*3600;
     bias = bias !==0 ? '+'+ bias : bias;
    
    //reformat unix dst dates
    let dstStart = new Date(zone.zoneStart*1000);
    let dstEnd = new Date(zone.zoneEnd*1000);

    //convert dst times from EST to its local time.
     dstStart = dstStart.getTime() + (dstStart.getTimezoneOffset()*60000);
     dstStart = new Date(dstStart + 3600000*rawOffset);
     dstEnd = dstEnd.getTime() + (dstEnd.getTimezoneOffset()*60000);
     dstEnd = new Date(dstEnd + 3600000*rawOffset);

    //Some of the DST data from the resource is inaccurate. This check validates DST dates in the southern hemisphere. 
    if(new Date() > dstStart && new Date() < dstEnd && dst === 'Off'){
        const a = dstStart;
        dstStart = dstEnd;
        dstEnd = a;
    }
    //create a condition for no DST. 
     dstEnd = dstEnd.getYear() === 69 || dstEnd.getYear() === 70 ? 'none' : dstEnd;
    
    return { zoneName, offset, bias, dst, dstStart, dstEnd };
}
