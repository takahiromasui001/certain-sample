import React from 'react';
import ProductList from './ProductList'
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
          <ProductList/>
        </Route>
        <Route path="/">
          <div>Test</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
