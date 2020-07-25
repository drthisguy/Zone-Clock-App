import React, { Fragment, useState } from 'react'
import { FourDigitClock } from '../FourDigitClock'
import { Button } from '../Grid'

export function HistoryList({ data, loadCity, clearList }) {

    const [ confirmed, isConfirmed ] = useState(false),

    listCities = cities => {
        return (
            cities.map( (city, i) => 
                <li className="historic-city"
                 key={i}
                 style={itemStyle}
                 onClick={loadCity.bind(null, i)}
                 >
                    {city.name}
                    <FourDigitClock offset={city.offset} />
                </li>
            )
        )
    },

    confirmListReset = () => {
        if (data.length < 1) {
            return
        }

        if (confirmed) {
          return (
            <div className={"remove"}>
              <Button
                type="button"
                className="btn btn-danger"
                style={clrBtn}
                onClick={clearList.bind(null, () => {isConfirmed(!confirmed)})}
              >
                <i className="fas fa-exclamation"> </i> Please Confirm
              </Button>
              <Button
                className="btn minus"
                style={{ float: "left" }}
                onClick={() => {
                  isConfirmed(!confirmed);
                }}
              >
                <i className="fas fa-ban" /> Cancel
              </Button>
            </div>
          );
        } else {
          return (
            <div className={"remove"}>
              <Button
                className="btn minus"
                style={{ float: "left" }}
                onClick={() => {
                  isConfirmed(!confirmed);
                }}
              >
                Clear History
              </Button>
            </div>
          );
        }
      }


    return (
        <div>
            <ul style={listStyle} >
                <Fragment>
                     {listCities(data)}
                </Fragment>
                     {confirmListReset()}
            </ul>
        </div>
    )
}

const itemStyle = {
    alignItems: 'center',
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, .3)',
    justifyContent: 'space-between',
    padding: '12px 20px',
    display: 'flex'
},
listStyle = {
    paddingLeft: '0px',
    flexDirection: 'column'
}, 
clrBtn = { 
    float: 'right', 
    marginTop: '10px',
    fontSize: '9px',
    backGroundColor: '#d23430',
    borderColor: '#c9302c',
    color: 'white', 
    padding: '3px 10px',
    fontWeight: '700'
}
