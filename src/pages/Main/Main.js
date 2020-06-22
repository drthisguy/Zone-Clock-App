import React from 'react'
import logo from '../../logo.svg';
import { Container, Row } from '../../components/Grid';
import ClockMount from '../../components/ClockMount';

export default function Main() {
    return (
        <Container >
        <ClockMount />
        <Row >
          
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
