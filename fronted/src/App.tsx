import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/molecules/header';
import { OneBoard } from './components/molecules/oneboard';

function App() {
  return (
    <div className="App">
      <Header title="today-todo!" />
      <OneBoard name="todo" />
    </div>
  );
}

export default App;
