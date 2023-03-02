import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import StarWasProvider from './context/StarWasProvider';

function App() {
  return (
    <div>
      <StarWasProvider>
        <Header />
        <Table />
      </StarWasProvider>
    </div>
  );
}

export default App;
