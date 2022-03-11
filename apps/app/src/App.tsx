import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@iw/button';
import { Title } from '@iw/title';
import { Text } from '@iw/text';

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
        <Text text="this is a test" />
      </header>
    </div>
  );
}

export default App;
