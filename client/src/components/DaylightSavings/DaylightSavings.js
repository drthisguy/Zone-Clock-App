import React from 'react'
import { Row, Col } from '../Grid'
import { DatePicker } from '../DatePicker'

export function DaylightSavings({ dstStart, dstEnd }) {


    if (dstEnd === 'none') {
        return <h2>No Daylight Savings</h2>  
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
