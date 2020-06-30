import React from 'react'

export function ListGroup({ data }) {
    return (
        <div>
            <ul  class="list-group">
                <li style={{border:'none'}} className="list-group-item active d-flex justify-content-between align-items-center">
                    Time Zone:
                    <span>{data.zoneName}</span>
                </li>
                <li style={{border:'none'}} className="list-group-item d-flex justify-content-between align-items-center">
                    GMT Offset:
                    <span>{data.offset}</span>
                </li>
                <li style={{border:'none'}} className="list-group-item d-flex justify-content-between align-items-center">
                    Bias (Seconds):
                    <span>{data.bias}</span>
                </li>
                <li style={{border:'none'}} className="list-group-item d-flex justify-content-between align-items-center">
                    Daylight Savings:
                    <span>{data.dst}</span>
                </li>
            </ul>
        </div>
    )
}
