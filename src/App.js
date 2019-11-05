import React from 'react';
import logo from './logo.svg';
import './App.css';
import Teste from './Teste.tsx'

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"></link>
      <header className='pl5'>
        <h1>IHC Articles</h1>
      </header>
      <Teste />
    </div>
  );
}

export default App;
