import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar'
import Main from './pages/Main'
import './App.css';


function App() {
  return (
    <Router >
    <div className="App">
    <Navbar />
    <Main />
   
    </div>
    </Router>
  );
}

export default App;
