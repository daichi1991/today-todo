import * as React from 'react';
import './App.css';
import {Provider} from './contexts';
import {Container} from './components/molecules/container'


function App() {

  return (
    <div className="App">
        <Provider>
          <Container />
        </Provider>
      
    </div>
  );
}

export default App;
