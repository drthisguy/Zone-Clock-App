import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Main from './pages/Main'
import About from './pages/About'
import './App.css';


function App() {
  return (
    <Router >
      <Navbar />
      <Route exact path="/"><Main /></Route>
      <Route exact path="/about" ><About /></Route>
    </Router>
  );
}

export default App;
