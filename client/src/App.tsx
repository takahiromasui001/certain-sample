import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Product from './Product'
import Specification from './Specification'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/products">
          <Product/>
        </Route>
        <Route path="/specifications">
          <Specification/>
        </Route>
        <Route path="/">
          <div>Test</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
