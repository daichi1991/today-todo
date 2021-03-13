import React from 'react';
import './App.css';
import { Header } from './components/molecules/header';
import { Boards } from './components/molecules/boards';

const boardContents = [
  {id:1, name:"Todo", position:1 },
  {id:2, name:"Doing", position:2},
  {id:3, name:"Done", position:3 },
]

function App() {
  return (
    <div className="App">
      <Header title="today-todo!" />
      <Boards boards={boardContents} />
    </div>
  );
}

export default App;
