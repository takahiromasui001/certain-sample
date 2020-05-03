import React from 'react';
import Product from './Product'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/products">
          <Product/>
        </Route>
        <Route path="/">
          <div>Test</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
