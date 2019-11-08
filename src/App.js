import React from 'react';
import logo from './logo.svg';
import './App.css';
import Teste from './Teste.tsx'

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      <div className='pa4'>
        <h1>IHC Articles</h1>
        <Teste />
      </div>
    </div>
  );
}

export default App;
