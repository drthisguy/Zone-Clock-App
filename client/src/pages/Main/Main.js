import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import logo from '../../logo.svg';
import { Container, Row, Col } from '../../components/Grid';
import ClockMount from '../../components/ClockMount';
import { SearchField, Button } from '../../components/Search';
import { useFetch } from '../../utils/CustomHooks';
import API from '../../utils/API'

export default function Main() {

  const [city, setCity] = useState({token: uuid()}),
   [coordinates, setCoordinates] = useState({}),
   [properName, setProperName] = useState('Sapling-Inc'),
   [predictions, setPredictions] = useState({}),
   [url, setUrl] = useState(''),

   fetchAPI = useFetch(url),

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
    // lat = results[0].geometry.location.lat,
    // lng = results[0].geometry.location.lng,
    // place = results[0].formatted_address;

    // setCoordinates({ lat, lng })
    // setProperName(place)
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
    getZone(value)
  }


  useEffect(() => {
    // const { data, isLoading, hasError, errorMessage } = fetchAPI
   
    
    // setUrl(`https://maps.googleapis.com/maps/api/geocode/json?address=paris,+france&key=${googAPIKey}`)
  }, [])
  
  const getZone = async city => {
    try{
    const { results } = await API.googleThis(city),
      [ place ] = results,
      lat = place.geometry.location.lat,
      lng = place.geometry.location.lng;
      
    setProperName(place.formatted_address)
    setCoordinates({ lat, lng })
    } catch(err) {console.log(err)}
  }

    return (  
        <Container >
        <ClockMount />
        <Row >
          <Col size="md-3" >
            <form class="form-group mb-5">
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