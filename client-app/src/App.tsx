import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Header } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Header as='h1' icon='users' content="hahaha" />
      <header className="App-header">
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
