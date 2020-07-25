import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../utils/CustomHooks';
import { SearchField, Container, Row, Col } from '../../components/Grid';
import { ClockMount } from '../../components/ClockMount';
import { ListGroup } from '../../components/ListGroup';
import { HistoryList } from '../../components/HistoryList';
import { DigitalClock } from '../../components/DigitalClock';
import { AnalogClock } from '../../components/AnalogClock';
import { DaylightSavings } from '../../components/DaylightSavings';
import { WorldMap } from '../../components/WorldMap';
import { Loading } from '../../components/Loading';
import { uuid } from 'uuidv4';
import API from '../../utils/API';

export default function Main() {

  const [city, setCity] = useState({ token: uuid() }),
    [coordinates, setCoordinates] = useState({ lat: 40.2067884, lng: -75.099807 }),
    [names, setNames] = useState({ longName: 'Sapling, Warminster, Pa', shortName: 'Sapling' }),
    [predictions, setPredictions] = useState({}),
    [history, setHistory] = useState([]),

    initialMount = useRef(true),

    { zone, updateUrl, isLoading, hasError, errorMessage, setNewError } = useFetch();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('history'))
      if (data) {
        setHistory(data)
      }
    } catch (err) { setNewError(err) }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('history', JSON.stringify(history))
    } catch (err) { setNewError(err) }
  }, [history])
  
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      const updateLocalStorage = () => {
        zone.coords = coordinates;
        zone.names = names;

        if (history.some( ({ names }) => names.longName === zone.names.longName)) {
          return
        }
        if (history.length > 16) {
          history.shift();
        }
        setHistory([...history, zone])
      }
      updateLocalStorage()
    }
  }, [zone])

  const onInputChange = async e => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value })

    if (value.length > 0) {
      try {
        let suggestions;
        const { predictions, status } = await API.predictCities({ ...city, name: value });

        suggestions = status === 'OK' ? predictions.map(({ description }) => description) : ['NO SUGGESTIONS']
        setPredictions({ suggestions })
      }
      catch (err) { setNewError(err) }
    }
  },

  renderPredictions = () => {
    const { name } = city,
      { suggestions } = predictions;

    if (!suggestions || suggestions.length < 1) return;
    if (name.length < 1) {
      setPredictions({ ...predictions, suggestions: [] });
      return;
    }
    return (
      <ul
        style={{ listStyleType: "none", textAlign: "left", position: "absolute" }}
      >
        {suggestions.map((suggestion, i) => (
          <li onClick={() => selectPredictions(suggestion)} key={i}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  },

  selectPredictions = str => {
    const value = normalizeString(str);
    setPredictions({ suggestions: [], text: '' })
    getCity(value)
  },

  //removes any accent/diacritic markings from autocompleted, text input.
  normalizeString = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),

  onFormSubmit = e => {
    e.preventDefault();
    e.target.reset();

    getCity(city.name)
  },

  getCity = async city => {
    try {
      const { results: [ place ] } = await API.googleThis(city),

        longName = place.formatted_address.replace(/[0-9]/g, ''), //remove any numbering that's common here with google.
        shortName = place.address_components[0].long_name,
        lat = place.geometry.location.lat,
        lng = place.geometry.location.lng,
        zoneURL = `/api/timezone/${lat}/${lng}`;

      setNames({ longName, shortName });
      setCoordinates({ lat, lng });
      setCity({ name: '', token: uuid() });
      updateUrl(zoneURL);
    } catch (err) {
      setNewError(
        'Nothing found. Check spelling. Or if the problem persist, the resource may be down. Try again later.'
      );
    }
  },

  loadCityFromStorage = index => {
    const { coords: { lat, lng }, names } = history[index],
      zoneUrl = `/api/timezone/${lat}/${lng}`;

    setNames(names)
    setCoordinates({ lat, lng })
    updateUrl(zoneUrl);
  },

  clearHistoryList = cb => {
    localStorage.clear();

    setHistory([]);
    cb(); //cancel edit state
  },

  Messenger = () => <p style={errMsg}>{errorMessage}</p>

  return (
    <Container >
      <ClockMount />
      <Row >
        <Col size="md-3" >
          <form onSubmit={onFormSubmit} className="form-group mb-5">
            <div>
              <span className="fas fa-search-location" style={eyeGlass} />
              <SearchField
                style={inputField}
                placeholder={"Search a City..."}
                autoComplete="off"
                name="name"
                value={predictions.text}
                onChange={onInputChange}
              />
              {renderPredictions()}
            </div>
            <div style={{ height: "50px" }} />
          </form>
          <div style={historyStyle}>
            <h5><i className="fas fa-history"></i><em style={{ float: 'right' }}>History</em></h5>
          </div>
          <HistoryList
            data={history.map(({ names, rawOffset }) => new Object({ name: names.shortName, offset: rawOffset }))}
            loadCity={loadCityFromStorage}
            clearList={clearHistoryList}
          />
        </Col>
        <Col size="md-9" >

        {hasError && <Messenger />}

        { isLoading ? <Loading /> :
        
          <div className="jumbotron">
            <Row >
              <Col size='md-6'>
                <h4 style={{ marginTop: '-40px' }}><center><em><b>{names.longName}</b></em></center></h4>
                <ListGroup data={zone} />
              </Col>
              <Col size='md-4' classes="mt-n5 offset-md-2">
                <Row>
                  <AnalogClock offset={zone.rawOffset} />
                </Row>
                <Row classes="justify-content-center mt-2">
                  <DigitalClock offset={zone.rawOffset} />
                </Row>
              </Col>
            </Row>
          </div>
}
          { isLoading ? <Loading /> :

          <div className="jumbotron">
            <Row >
              <Col size='md-12'>
                <WorldMap
                  coords={coordinates}
                />
              </Col>
            </Row>
            <hr className='mt-4' />
              <DaylightSavings
                name={names.shortName}
                dstStart={zone.dstStart}
                dstEnd={zone.dstEnd}
                code={zone.countryCode}
              />
          </div>
}
      { isLoading ? <Loading /> : <div/> }
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
inputField = { 
  textIndent: "30px", 
  borderRadius: "1rem"
},
historyStyle = {
  margin: '25px 0px 25px 0px',
  borderBottom: '1px solid',
},
errMsg = {
  backgroundColor: '#fde4cc',
  color: '#7f3f00',
  position: 'relative',
  padding: '0.75rem 1.25rem',
  marginBottom: '1rem',
  border: '1px solid #fcdab8',
  borderRadius: '0.25re'
}