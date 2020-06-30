import React from 'react'

export function ListGroup({ data }) {
    return (
        <div>
            <ul  className="list-group mt-5">
                <li style={{borderWidth:'0px 0px 1px 0px'}} className="list-group-item  d-flex justify-content-between align-items-center">
                    Time Zone:
                    <span>{data.zoneName}</span>
                </li>
                <li style={{borderWidth:'0px 0px 1px 0px'}} className="list-group-item d-flex justify-content-between align-items-center">
                    GMT Offset:
                    <span>{data.offset}</span>
                </li>
                <li style={{borderWidth:'0px 0px 1px 0px'}} className="list-group-item d-flex justify-content-between align-items-center">
                    Bias (Seconds):
                    <span>{data.bias}</span>
                </li>
                <li style={{borderWidth:'0px 0px 1px 0px'}} className="list-group-item d-flex justify-content-between align-items-center">
                    Daylight Savings:
                    <span>{data.dst}</span>
                </li>
            </ul>
        </div>
    )
}

