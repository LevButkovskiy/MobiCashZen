import React, { Suspense } from 'react';
import './App.css';
import NavBar from './UI/NavBar';

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <NavBar/>
      </div>
    </Suspense>
  );
}

export default App;
