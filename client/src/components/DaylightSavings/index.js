import React, { Fragment } from 'react'
import { Row, Col } from '../Grid'
import { DatePicker } from '../DatePicker'
import { getCountryGroup } from '../../utils/Helpers'

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
                    <h2><i class="small material-icons">timelapse</i> No Daylight Savings{'\n'}</h2>
                </Row>
                <Row>
                    <p>{`${name} Does NOT observe a daylight savings. Choose`} <b><em>"None"</em></b> for this clock.</p>
                </Row>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Row>
                    <h2><i class="small material-icons">timelapse</i> Daylight Savings</h2>  
                </Row>
                <Row>
                    {message}
                </Row>
                <Row >
                    <Col size='md-6'>
                        <DatePicker dst={dstStart} right={{float: 'right'}} />
                    </Col>
                    <Col size='md-6'>
                        <DatePicker dst={dstEnd} right={{}} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
