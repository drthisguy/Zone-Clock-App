import React, { Fragment } from 'react';
import { getCountryGroup, stringTime } from '../../utils/Helpers';
import { Row, Col } from '../Grid';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export function DaylightSavings({ name, dstStart, dstEnd, code }) {
    
    let message,
      group = getCountryGroup(code);
    
    if (group === 'none') {
         message = <p>{<em>{name}</em>} has no preset daylight savings schedule.  Select the <b><em>"Day of Week in Month"</em></b> method. And configure the dates as follows:</p>
    }
    else {
        message = <p>Daylight Savings for {<em>{name}</em>} is scheduled as follows... Choose <b><em>{group}</em></b> for this clock.</p>
    }

    if (dstEnd === 'none') {
        return (
            <Fragment>
                <Row>
                    <h2><i className="small material-icons">timelapse</i> No Daylight Savings</h2>
                </Row>
                <Row>
                    <p>{<em>{name}</em>} Does NOT observe a daylight savings. Choose <b><em>"None"</em></b> for this clock.</p>
                </Row>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Row>
                    <h2><i className="small material-icons">timelapse</i> Daylight Savings</h2>  
                </Row>
                <Row>
                    {message}
                </Row>
                <Row >
                    <Col size="md-6" classes="text-center" >
                        <div style={window.innerWidth > 767 ? {float:"right"} : {}}>
                            <style>{birthdayStyle}</style>
                            <DayPicker 
                            month={new Date(dstStart.getFullYear(), dstStart.getMonth())} 
                            modifiers={{highlighted: dstStart}} 
                            months={beginMonths} 
                            />
                            <div style={window.innerWidth > 767 ? {textAlign:"center"} : {}} >
                               {dstStart.toDateString()} at {stringTime(dstStart)}
                            </div>
                        </div>
                    </Col>
                    <Col size="md-6">
                        
                        <div>
                            <style>{birthdayStyle}</style>
                            <DayPicker 
                            month={new Date(dstEnd.getFullYear(), dstEnd.getMonth())}
                            modifiers={{highlighted: dstEnd}} 
                            months={endMonths} 
                            />
                            <div style={window.innerWidth > 992 ? {marginLeft: "40px"} : {}}>
                                {dstEnd.toDateString()} at {dstEnd.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }).replace(/^0(?:0:0?)?/, '')}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const birthdayStyle = `.DayPicker-Day--highlighted {
    background-color: #fcaf17;
    color: white;
  }`,
  beginMonths = [
    'Begins January',
    'Begins February',
    'Begins March',
    'Begins April',
    'Begins May',
    'Begins June',
    'Begins July',
    'Begins August',
    'Begins September',
    'Begins October',
    'Begins November',
    'Begins December',
  ],
  endMonths = [
    'Ends January',
    'Ends February',
    'Ends March',
    'Ends April',
    'Ends May',
    'Ends June',
    'Ends July',
    'Ends August',
    'Ends September',
    'Ends October',
    'Ends November',
    'Ends December',
  ];