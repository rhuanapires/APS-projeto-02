import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Rotas from './Rotas';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Rotas />
      </Router>
    </div>
  );
}

export default App;
