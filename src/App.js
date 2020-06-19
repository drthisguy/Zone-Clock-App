import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import Navbar from './Components/Navbar';
import { Container } from './Components/Grid';
import ClockMount from './Components/ClockMount';
import './App.css';

function App() {
  return (
    <Router >
    <div className="App">
    <Navbar />
    <Container >
    <ClockMount />

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
    </div>
    </Router>
  );
}

export default App;
