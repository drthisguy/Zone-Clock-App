import React, { useState, useEffect, useRef } from 'react';
import { uuid } from 'uuidv4';
import { Container, Row, Col } from '../../components/Grid';
import { ClockMount } from '../../components/ClockMount';
import { SearchField } from '../../components/Search';
import { ListGroup } from '../../components/ListGroup';
import { HistoryList } from '../../components/HistoryList';
import { DigitalClock } from '../../components/DigitalClock';
import { AnalogClock } from '../../components/AnalogClock';
import { DaylightSavings } from '../../components/DaylightSavings';
import { WorldMap } from '../../components/WorldMap';
import { useFetch } from '../../utils/CustomHooks';
import API from '../../utils/API';

export default function Main() {

  const [ city, setCity ] = useState({token: uuid()}),
   [ coordinates, setCoordinates ] = useState({lat: 40.2067884, lng: -75.099807}),
   [ names, setNames ] = useState({longName:'Sapling, Warminster, Pa', shortName:'Sapling'}),
   [ predictions, setPredictions ] = useState({}),
   [ query, setQuery ] = useState([]),
   [ history, setHistory ] = useState([]),

   initialMount = useRef(true),

   { zone, isLoading, hasError, errorMessage, updateUrl } = useFetch();
  
   useEffect(() => {
     try {
     const data = JSON.parse(localStorage.getItem('history'))
     if (data) {
      setHistory(data)
     }
    } catch (err) {console.log(err)}
   }, [])

   useEffect(() => { 
     try {
      localStorage.setItem('history', JSON.stringify(history))
     } catch (err) {console.log(err)}
   }, [history])

   useEffect(() => { 
      if (initialMount.current) {
        initialMount.current = false;
      }else {
        updateLocalStorage()
      }
   }, [zone])

   useEffect(() => {
    const timeOutId = setTimeout(() => setCity(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const onInputChange = async(e) => {
    const { name, value } = e.target;
    setQuery({ ...city, [name]: value })

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

    getCoordinates(city.name)
  },

  updateLocalStorage = () => {
    zone.coords = coordinates;
    zone.names = names; 

    if (history.some( x => x.names.longName === zone.names.longName)) {
      return
    }
    if (history.length > 16) {
      history.shift();
    }
    setHistory([...history, zone ])
  },

  getCoordinates = async city => {
    try{
    const { results } = await API.googleThis(city),
      [ place ] = results,
      longName = place.formatted_address.replace(/[0-9]/g, ''),  //remove any numbering that's common here with google.
      shortName = place.address_components[0].long_name,
      lat = place.geometry.location.lat,
      lng = place.geometry.location.lng,
      zoneURL = `/api/timezone/${lat}/${lng}`;
      
    setNames({ longName, shortName })
    setCoordinates({ lat, lng })
    setCity({name: '', token: uuid()})
    updateUrl(zoneURL)
    } catch(err) {console.log(err)}
  },

  renderPredictions = () => {
      const { name } = query,
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

  selectPredictions = str => {
    const value = normalizeString(str);
    setPredictions({ suggestions: [], text: '' })
    getCoordinates(value)
  },

  //removes any accent/diacritic markings form autocompleted, text input.
  normalizeString = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),

  loadCityFromStorage = index => {
    const { coords, names } = history[index],
      zoneUrl = `/api/timezone/${coords.lat}/${coords.lng}`;

    setNames(names)
    setCoordinates(coords)
    updateUrl(zoneUrl);
  },

  clearHistoryList = cb => {
    localStorage.clear();
    setHistory([]);
    cb();
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
            <div style={historyStyle}>
              <h5><i className="fas fa-history"></i><em style={{float:'right'}}>History</em></h5>
            </div>
            <HistoryList 
            data={history.map( x => new Object({name: x.names.shortName, offset: x.rawOffset}))}
            loadCity={loadCityFromStorage}
            clearList={clearHistoryList}
             />
          </Col>
          <Col size="md-9" >
                <div className="jumbotron">
                    <Row >
                        <Col size='md-6'>
                            <h4 style={{marginTop:'-40px'}}><center><em><b>{names.longName}</b></em></center></h4>
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
                      <WorldMap 
                      coords={coordinates} 
                      />
                  </Col>
                  </Row>
                  <hr className='mt-4' />
                  {isLoading ? <div/> : 
                    <DaylightSavings 
                    name={names.shortName} 
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
}, 

historyStyle = {
  margin: '25px 0px 25px 0px',
  borderBottom: '1px solid',
}