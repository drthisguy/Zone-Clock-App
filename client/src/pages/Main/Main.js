import React, { useState, useEffect  } from 'react';
import { uuid } from 'uuidv4';
import { Container, Row, Col } from '../../components/Grid';
import { ClockMount } from '../../components/ClockMount';
import { SearchField } from '../../components/Search';
import { ListGroup } from '../../components/ListGroup';
import { DigitalClock } from '../../components/DigitalClock';
import { AnalogClock } from '../../components/AnalogClock';
import { DaylightSavings } from '../../components/DaylightSavings';
import { WorldMap } from '../../components/WorldMap';
import { useFetch } from '../../utils/CustomHooks';
import API from '../../utils/API';

export default function Main() {

  const [ city, setCity ] = useState({token: uuid()}),
   [ coordinates, setCoordinates ] = useState({lat: 40.2067884, lng: -75.099807}),
   [ properName, setProperName ] = useState('Sapling, Warminster, Pa'),
   [ shortName, setShortName ] = useState('Sapling'),
   [ predictions, setPredictions ] = useState({}),
   [ history, setHistory ] = useState([]),
   [ storage, setStorage ] = useState([]),

   { zone, isLoading, hasError, errorMessage, updateUrl } = useFetch();
  
   useEffect(() => {
     const data = JSON.parse(localStorage.getItem('history'))
     if (data) {
      setHistory(data);
     }
   }, [])

   useEffect(() => { 
     saveHistory()
   }, [history])

  const onInputChange = async(e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value })

    if (value.length > 0) {
    try {
      let suggestions;
      const { predictions, status } = await API.predictCities({...city, name: value});
      
      suggestions = status === 'OK' ? predictions.map( x => x.description) : ['NO SUGGESTIONS']
      setPredictions({ suggestions })
    }
    catch(err) {return}
    }
  },
  
  onFormSubmit = e => {
    e.preventDefault();
    e.target.reset();

    setShortName(capitalizeWord(city.name))
    getCoordinates(city.name)
  },

  saveHistory = () => {
    localStorage.setItem('history', JSON.stringify(history))
  },

  capitalizeWord = word => word.replace(/\b[a-z]/g, char => char.toUpperCase()),

  getCoordinates = async city => {
    try{
    const { results } = await API.googleThis(city),
      [ place ] = results,
      lat = place.geometry.location.lat,
      lng = place.geometry.location.lng,
      zoneURL = `/api/timezone/${lat}/${lng}`;
      
    setProperName(place.formatted_address)
    setCoordinates({ lat, lng })
    setCity({name: '', token: uuid()})
    setHistory([...history, zone ])
    updateUrl(zoneURL)
    } catch(err) {console.log(err)}
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
    setShortName(value)
    setPredictions({ suggestions: [], text: '' })
    getCoordinates(value)
  }

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
                  autocomplete="off"
                  name="name"
                  value={predictions.text}
                  style={{textIndent: "30px", borderRadius: "1rem"}}
                  onChange={onInputChange}
                  />
                  {renderPredictions()}
              </div>
                <div style={{height:"50px"}} />
            </form>
          </Col>
          <Col size="md-9" >
                <div className="jumbotron">
                    <Row >
                        <Col size='md-6'>
                            <h4 style={{marginTop:'-40px'}}><em><b>{properName}</b></em></h4>
                            {isLoading ? <div/> : <ListGroup data={zone} />}
                        </Col>
                        <Col size='md-4' classes="mt-n5 offset-md-2">
                          <Row>
                          {isLoading ? <div/> : <AnalogClock offset={zone.rawOffset} />}
                         </Row>
                         <Row classes="justify-content-center mt-2">
                            {isLoading ? <div/> : <DigitalClock offset={zone.rawOffset} />}
                        </Row>
                        </Col>
                    </Row>
                </div>
                <div className="jumbotron">
                  <Row >
                  <Col size='md-12'>
                      <WorldMap coords={coordinates} />
                  </Col>
                  </Row>
                  <hr className='mt-4' />
                  {isLoading ? <div/> : 
                    <DaylightSavings 
                    name={shortName} 
                    dstStart={zone.dstStart} 
                    dstEnd={zone.dstEnd}
                    code={zone.countryCode}
                     />}
                </div>
          </Col>
        </Row>
      </Container>
    )
}

const eyeGlass = {
  position: 'absolute',
  top: '10px',
  left: '25px',
}