import React, { Fragment } from 'react'
import { FourDigitClock } from '../FourDigitClock'

export  function HistoryList({ data }) {

    const listCities = cities => {
        return (
            cities.map( city => 
                <li style={itemStyle} className='historic-city' >
                    {city.name}
                    <FourDigitClock offset={city.offset} />
                </li>
            )
        )
    }

    return (
        <div>
            <ul style={listStyle} >
                <Fragment>
                     {listCities(data)}
                </Fragment>
            </ul>
            
        </div>
    )
}

const itemStyle = {
    alignItems: 'center',
    border: 'none',
    borderBottom: '1px solid',
    justifyContent: 'space-between',
    padding: '12px 20px',
    display: 'flex'
},
listStyle = {
    paddingLeft: '0px',
    flexDirection: 'column'
}
