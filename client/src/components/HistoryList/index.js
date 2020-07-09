import React, { Fragment } from 'react'

export  function HistoryList({ data }) {

    const listCities = cities => {
        return (
            cities.map( city => 
            <li className="list-group-item d-flex justify-content-between align-items-center">
            {city.names.shortName}
            <span class=''>12:00pm</span>
        </li>
        )
        )
    }


    return (
        <div>
            <ul class="list-group">
               {listCities(data)}
            </ul>
            
        </div>
    )
}
