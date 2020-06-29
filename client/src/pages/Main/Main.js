import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import logo from '../../logo.svg';
import { Container, Row, Col } from '../../components/Grid';
import ClockMount from '../../components/ClockMount';
import { SearchField } from '../../components/Search';
import { useFetch, useForceUpdate } from '../../utils/CustomHooks';
import API from '../../utils/API'

export default function Main() {

  const [city, setCity] = useState({token: uuid()}),
   [coordinates, setCoordinates] = useState({}),
   [properName, setProperName] = useState('Sapling-Inc'),
   [predictions, setPredictions] = useState({}),
   [url, setUrl] = useState(''),

   fetchAPI = useFetch(url),
   forceUpdate = useForceUpdate(),

  onInputChange = async(e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value })

    if (value.length > 0) {
    try {
      let suggestions;
      const { predictions, status } = await API.predictCities({...city, name: value});
      
      suggestions = status === 'OK' ? predictions.map( x => x.description) : ['NETWORK ERROR']
      setPredictions({ suggestions })
    }
    catch(err) {return}
    }
  },
  
  onFormSubmit = e => {
    e.preventDefault();
    e.target.reset();

    getCoordinates(city.name)
  },

  getCoordinates = async city => {
    try{
    const { results } = await API.googleThis(city),
      [ place ] = results,
      lat = place.geometry.location.lat,
      lng = place.geometry.location.lng;
      
    setProperName(place.formatted_address)
    setCoordinates({ lat, lng })
    setCity({name: '', token: uuid()})
    getZone(lat, lng)
    } catch(err) {console.log(err)}
  },

  getZone = (lat, lng) => {
    
    const zoneURL = `/api/timezone/${lat}/${lng}`;

    setUrl(zoneURL)
    forceUpdate();
    const { data, isLoading, hasError, errorMessage } = fetchAPI
      console.log('fetched things:', data, isLoading, hasError, errorMessage, url )
  },

  renderPredictions = () => {
      const { name } = city,
      { suggestions } = predictions;

    if (!suggestions || suggestions.length < 1) return
      if (name.length < 1){
        setPredictions({...predictions, suggestions: []})
        return
      }
    return (
        <ul style={{listStyleType:"none", textAlign:"left", position:"absolute"}}>
          {suggestions.map( (suggestion, i) => <li onClick={() => selectPredictions(suggestion)} key={i}>{suggestion}</li>)}
        </ul>
    )
  }, 

  selectPredictions = value => {
    setPredictions({ suggestions: [], text: value })
    getCoordinates(value)
  }


  useEffect(() => {
    const { data, isLoading, hasError, errorMessage } = fetchAPI
      console.log('fetched things:', data, isLoading, hasError, errorMessage )
  }, [url])

    return (  
        <Container >
        <ClockMount />
        <Row >
          <Col size="md-3" >
            <form onSubmit={onFormSubmit} class="form-group mb-5">
              <div>
              <span className="fas fa-search-location" style={eyeGlass} />
                <SearchField 
                placeholder={"Search a City..."}
                name="name"
                value={predictions.text}
                autocomplete="off"
                style={{textIndent: "30px", borderRadius: "1rem"}}
                onChange={onInputChange}
                />
                {renderPredictions()}
                </div>
                <div style={{height:"50px"}} />
                {/* <Button>Search</Button> */}
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
},
eyeGlass = {
  position: 'absolute',
  top: '10px',
  left: '25px',
}