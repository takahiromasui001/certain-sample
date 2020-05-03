import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [components, setComponents] : any = useState([])

  useEffect(() => {
    const getApiResult = async () => {
      const result: any = await axios.get('http://localhost:3000/api/v1/products')
      setComponents(result.data[0])
    }

    getApiResult()
  }, [])

  console.log(components)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        <div>
          {components.name}
        </div>
        <div>
          {components.maker}
        </div>
        <div>
          {components.price}
        </div>
      </header>
    </div>
  );
}

export default App;
