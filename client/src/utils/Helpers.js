export const getLocalTime = offset => {

    const userTime = new Date(),

    //convert user time to local time.
        msOffset = offset * 3600,  // -> milliseconds
        utc = userTime.getTime() + (userTime.getTimezoneOffset() * 60000),
        localTime = new Date(utc + 1000 * msOffset);

    let localHours = localTime.getHours(),
        localMinutes = localTime.getMinutes(),
        localSeconds = localTime.getSeconds();

    return { localHours, localMinutes, localSeconds }
}

export const FormatZone = zone => {

    let { dst, gmtOffset, zoneStart, zoneEnd } = zone;

    //get real offset in hours
     dst = dst == 1 ? 'ON' : 'OFF';
    const rawOffset = gmtOffset/3600,
     preOff = dst === 'ON' ? rawOffset - 1 : rawOffset;
    let offset = Math.floor(preOff);
     offset = offset > 0 ? '+'+ offset : offset;

    //workout the bias offset in seconds
    let bias = Math.abs(preOff);
     bias = (bias - Math.floor(bias))*3600;
     bias = bias !==0 ? '+'+ bias : bias;
    
    //reformat unix dst dates
    let dstStart = new Date(zoneStart*1000);
    let dstEnd = new Date(zoneEnd*1000);

    //convert dst times from EST to its local time.
     dstStart = dstStart.getTime() + (dstStart.getTimezoneOffset()*60000);
     dstStart = new Date(dstStart + 3600000*rawOffset);
     dstEnd = dstEnd.getTime() + (dstEnd.getTimezoneOffset()*60000);
     dstEnd = new Date(dstEnd + 3600000*rawOffset);

    //Some of the DST data from the resource is inaccurate. This check validates DST dates in the southern hemisphere. 
    if(new Date() > dstStart && new Date() < dstEnd && dst === 'OFF') {
        const a = dstStart;
        dstStart = dstEnd;
        dstEnd = a;
    }
    //create a condition for no DST. 
     dstEnd = dstEnd.getYear() === 69 || dstEnd.getYear() === 70 ? 'none' : dstEnd;

     //other data used
     const { zoneName } = zone;
    
    return { zoneName, offset, bias, dst, dstStart, dstEnd, rawOffset };
}
