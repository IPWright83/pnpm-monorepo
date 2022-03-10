import React from 'react';
import logo from './logo.svg';
import './App.css';

import { log } from '@iw/log';
import { Title } from '@iw/title';

function App() {
  log('Rendering');

  return (
    <div className="App">
      <header className="App-header">
        <h1>App #2</h1>
        <Title />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
