import React, { Fragment } from 'react'
import { FourDigitClock } from '../FourDigitClock'

export  function HistoryList({ data, loadCity }) {

    const listCities = cities => {
        return (
            cities.map( (city, i) => 
                <li className='historic-city'
                 key={i}
                 style={itemStyle}
                 onClick={loadCity.bind(this, i)}
                 >
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
