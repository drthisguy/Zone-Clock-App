import React from 'react'
import logo from '../../logo.svg';
import { Container, Row, Col } from '../../components/Grid';
import ClockMount from '../../components/ClockMount';
import { SearchField, Button } from '../../components/Search';

export default function Main() {
    return (
        <Container >
        <ClockMount />
        <Row >
          <Col size="md-3" >
            <form class="form-group my-4">
                <SearchField placeholder="Search a City..." />
                <SearchField placeholder="State or Country.." />
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