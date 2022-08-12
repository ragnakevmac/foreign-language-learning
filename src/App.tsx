import React from 'react';
import Intro from './components/Intro';
import './App.css';

const num: number = 123;
console.log('hello!!!', num);

function App() {
  return (
    <div className="App">
      <Intro person="Kevin" />

      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>


    </div>
  );
}

export default App;
