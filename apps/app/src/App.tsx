import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@iw/button';
import { Title } from '@iw/title';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
      <h1>App #1</h1>
       <img src={logo} className="App-logo" alt="logo" />
        Your count is {count}
        <Button onClick={() => setCount((prev) => ++prev)} />
        <Title />
      </header>
    </div>
  );
}

export default App;
