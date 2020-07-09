import React from 'react'

export function ListGroup({ data }) {
    return (
        <div>
            <ul style={listStyle}>
                <li style={itemStyle}>Country:<span/>{data.countryName}</li>
                <li style={itemStyle}>Time Zone:<span/>{data.zoneName}</li>
                <li style={itemStyle}>GMT Offset:<span/>{data.offset}</li>
                <li style={itemStyle}>Bias (Secs):<span/>{data.bias}</li>
                <li style={itemStyle}>Daylight Savings:<span/>{data.dst}</li>
            </ul>
        </div>
    )
}

const itemStyle = {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    display: 'flex'
},

listStyle = {
    paddingLeft: '0px',
    flexDirection: 'column',
    marginTop: '50px',
    marginBottom: '-50px'
}
