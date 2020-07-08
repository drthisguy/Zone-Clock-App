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
     const { zoneName, countryCode, countryName } = zone;
    
    return { zoneName, offset, bias, dst, dstStart, dstEnd, rawOffset, countryName, countryCode };
}

const northAmerica = ['US','BM','MX','CA','TC'],
europe = ['AL','AD','AT','BY','BE','BA','HR','CZ','DK','FR','DE','GI','HU','IT','XK','LI','LU','MK','MT','ME','NL','NO','PL','SM','RS','SK','SI','ES','SE','CH','VA'],
eastEurope = ['BG','CY','EE','FI','GR','LV','LT','MD','RO','TR','UA'];

export const getCountryGroup = code => {
    
    if (northAmerica.includes(code)) {
        code = 'NA'
    }
    if (europe.includes(code)) {
        code = 'EU'
    }
    if (eastEurope.includes(code)) {
        code = 'EE'
    }
    switch (code) {
        case 'NA':
            return 'North American Group';
        case 'EU':
            return 'European Group';
        case 'EE':
            return 'Eastern European Group';
        case 'GB':
            return 'United Kingdom';
        case 'IE':
            return 'Ireland';
        case 'BR':
            return 'Brazil';
        case 'JO':
            return 'Jordan';
        case 'CL':
            return 'Chile';
        case 'LB':
            return 'Lebanon';
        case 'PY':
            return 'Paraguay';
        case 'PT':
            return 'Portugal';
        case 'SY':
            return 'Syria';
    
        default:
            return 'none';
    }

}