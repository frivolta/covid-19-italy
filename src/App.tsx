import React from 'react';
import { CovidChart } from './components/CovidChart';
import './App.css';

import { endpoints } from './config/api-endpoint';

function App() {
  return (
    <div className="App">
      <CovidChart apiUrl={endpoints.getInfectedByCountry} country="Italy" />
      <CovidChart apiUrl={endpoints.getInfectedByCountry} country="US" />
      <CovidChart apiUrl={endpoints.getInfectedByCountry} country="France" />
      <CovidChart apiUrl={endpoints.getInfectedByCountry} country="Germany" />
    </div>
  );
}

export default App;
