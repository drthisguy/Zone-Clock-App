import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import logo from '../../logo.svg';
import { Container, Row, Col } from '../../components/Grid';
import ClockMount from '../../components/ClockMount';
import { SearchField, Button } from '../../components/Search';
import { useFetch } from '../../utils/CustomHooks';
import API from '../../utils/API'

export default function Main() {

  const [city, setCity] = useState({city: 'Sapling-Inc', token: uuid()});
  const [coordinates, setCoordinates] = useState({})
  const [properName, setProperName] = useState('')
  const [url, setUrl] = useState('')
  const googAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;

  const fetchAPI = useFetch(url),

  onInputChange = async(e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value })

    const { predictions, status } = await API.predictCities(city);
    console.log("onInputChange -> predictions", predictions)

    // lat = results[0].geometry.location.lat,
    // lng = results[0].geometry.location.lng,
    // place = results[0].formatted_address;

    // setCoordinates({ lat, lng })
    // setProperName(place)
}

  useEffect(() => {
    const { data, isLoading, hasError, errorMessage } = fetchAPI
   
    console.log("fetchSomething -> data", data, isLoading, hasError, 
    errorMessage)
    setUrl(`https://maps.googleapis.com/maps/api/geocode/json?address=paris,+france&key=${googAPIKey}`)
  }, [])
  
  const getZone= () => {
    
  }

    return (  
        <Container >
        <ClockMount />
        <Row >
          <Col size="md-3" >
            <form class="form-group my-4">
                <SearchField 
                placeholder="Search a City..."
                name="city"
                onChange={onInputChange}
                />
                <SearchField 
                placeholder="State or Country.." 
                name="country"
                onChange={onInputChange}
                />
                <Button>Search</Button>
            </form>
          </Col>
          <Col size="md-9" >
                <div className="jumbotron">
                    <Row >
                        <Col size='md-6'>
                            <h4>Metropolis City</h4>
                        </Col>
                        <Col size='md-6' classes="mt-n5">
                            <img style={analog} src={require('../../assets/img/clock-ABS.png')} alt="Analog Clock" />
                        </Col>
                    </Row>

                </div>
          </Col>
        </Row>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          </Container>
    )
}

const analog = {
    width: '245px',
    float: 'right'
}