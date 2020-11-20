//returns local time to the many clocks this app uses.
export const getLocalTime = offset => {

    const userTime = new Date(),

    //convert user time to local time.
        offsetInMS = offset * 3_600_000,  // --> hours to milliseconds
        utc = userTime.getTime() + (userTime.getTimezoneOffset() * 60_000), // --> mins to milliseconds
        localTime = new Date(utc + offsetInMS);

    let localHours = localTime.getHours(),
        localMinutes = localTime.getMinutes(),
        localSeconds = localTime.getSeconds();

    return { localHours, localMinutes, localSeconds }
}

//format timezoneDB response data for use with Sapling clocks and their programming.
export const FormatZone = zone => {
/*-- Multiplying 3.6E6 converts hours to milliseconds, 60k converts mins and 1k converts secs.
--Dividing by 3600 converts seconds to hours. */

    let { dst, gmtOffset, zoneStart, zoneEnd, zoneName, countryCode, countryName } = zone,
     now = Date.now();

    //get offset in hours
     dst = dst === '1' ? 'ON' : 'OFF';
    const rawOffset = gmtOffset/3_600,
     preOff = dst === 'ON' ? rawOffset - 1 : rawOffset;
    let offset = Math.floor(preOff);
     offset = offset > 0 ? '+' + offset : offset;

    //workout the bias offset in seconds
    let bias = Math.abs(preOff);
     bias = (bias - Math.floor(bias)) * 3_600;
     bias = bias !== 0 ? '+' + bias : bias;
    
    //reformat unix dst dates
    let dstStart = new Date(zoneStart * 1_000);
    let dstEnd = new Date(zoneEnd * 1_000);

    //convert dst times from EST to its local time.  
     dstStart = dstStart.getTime() + 
        //This calculation affected by its relative differences in time.  Current DST status has to be considered (60mins added).  
        (60_000 * (dst === 'OFF' ? (dstStart.getTimezoneOffset() + 60) : dstStart.getTimezoneOffset())); 
     dstStart = new Date(dstStart + 3.6E6 * rawOffset);
     dstEnd = dstEnd.getTime() + 
        (60_000 * (dst === 'OFF' ? (dstEnd.getTimezoneOffset() + 60) : dstEnd.getTimezoneOffset()));
     dstEnd = new Date(dstEnd + 3.6E6 * (rawOffset));

    //Mixed dst schedule from one year with another creates bugs.  
     if(now > dstEnd && now.getFullYear() === dstEnd.getFullYear()) {
        const a = dstStart;
        dstStart = dstEnd;
        dstEnd = a;
     }

    // //Some of the DST data from the resource is inaccurate. This check validates DST dates in the southern hemisphere. Reverses designations if they're invalid.
    if(now > dstStart && now < dstEnd && dst === 'OFF') {
        const a = dstStart;
        dstStart = dstEnd;
        dstEnd = a;
    }
    //condition for no DST. 
     dstEnd = dstEnd.getYear() === 69 || dstEnd.getYear() === 70 ? 'none' : dstEnd;
     console.log("dstEnd", dstEnd, dstStart.getTimezoneOffset())

    return { zoneName, offset, bias, dst, dstStart, dstEnd, rawOffset, countryName, countryCode };
}

// Returns instruction for Daylight Savings.
export const getCountryGroup = code => {
    code = getRegion(code);

    const DSTGroups = new Map([
        ['NA', ()=>'North American Group'],
        ['EU', ()=>'European Group'],
        ['EE', ()=>'Eastern European Group'],
        ['GB', ()=>'United Kingdom'],
        ['IE', ()=>'Ireland'],
        ['BR', ()=>'Brazil'],
        ['JO', ()=>'Jordan'],
        ['MX', ()=>'Mexico'],
        ['CL', ()=>'Chile'],
        ['LB', ()=>'Lebanon'],
        ['PY', ()=>'Paraguay'],
        ['PT', ()=>'Portugal'],
        ['SY', ()=>'Syria'],
        ['default', ()=>'none']
      ])

      let group = DSTGroups.get(code) || DSTGroups.get('default');
      return group.call(this);
}

// If applicable, replace country code with one for its larger timezone region. 
function getRegion(code) {

    const northAmerica = ['US','BM','CA','TC'],
        europe = ['AL','AD','AT','BY','BE','BA','HR','CZ','DK','FR','DE','GI','HU','IT','XK','LI','LU','MK','MT','ME','NL','NO','PL','SM','RS','SK','SI','ES','SE','CH','VA'],
        eastEurope = ['BG','CY','EE','FI','GR','LV','LT','MD','RO','TR','UA'];

    if(northAmerica.includes(code))
        code = 'NA'

    if(europe.includes(code))
        code = 'EU'
        
    if(eastEurope.includes(code))
        code = 'EE'

    return code;
 }


/* Because DST start times don't actually exist, they get bumped up or back to the adjacent hour as part of its Unix timestamp. 
Therefore, they'll get converted into a string w/ the proper time, to be sent to the UI.  */   
export const stringTime = date => {
    let localHours = date.getHours() - 1, //get and correct the hour.
     localMinutes = date.getMinutes();

    localMinutes = (localMinutes < 10 ? '0':'')+ localMinutes;

    const timeOfDay = localHours < 12 ? 'AM' : 'PM';
    localHours = localHours === -1 ? localHours + 24 : localHours;
    localHours = localHours > 12 ? localHours - 12 : localHours;
    localHours = localHours === 0 ? 12 : localHours;

    const stringifyedTime = localHours + ":" + localMinutes + " " + timeOfDay;

    return stringifyedTime;
}