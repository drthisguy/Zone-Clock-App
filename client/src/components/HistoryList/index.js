import React, { Fragment } from 'react'
import { FourDigitClock } from '../FourDigitClock'

export  function HistoryList({ data }) {

    const listCities = cities => {
        return (
            cities.map( city => 
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {city.names.shortName}
                    <span className=''><FourDigitClock offset={city.rawOffset} /></span>
                </li>
            )
        )
    }


    return (
        <div>
            <ul class="list-group">
                <Fragment>
                     {listCities(data)}
                </Fragment>
            </ul>
            
        </div>
    )
}
