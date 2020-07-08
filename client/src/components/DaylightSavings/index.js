import React from 'react'
import { Row, Col } from '../Grid'
import { DatePicker } from '../DatePicker'

export function DaylightSavings({ name, dstStart, dstEnd }) {


    if (dstEnd === 'none') {
        return (
            <Row>
            <h2><i class="small material-icons">timelapse</i> No Daylight Savings</h2>  
            <br/>
            <p>{`${name} Does NOT observe a daylight savings. Choose`} <b><em>"None"</em></b> for this clock.</p>
            </Row>
        )
    } else {
        return (
            <Row >
                <Col size='md-6'>
                    <DatePicker dst={dstStart} right={{float: 'right'}} />
                </Col>
                <Col size='md-6'>
                    <DatePicker dst={dstEnd} right={{}} />
                </Col>
            </Row>
        )
    }
}
