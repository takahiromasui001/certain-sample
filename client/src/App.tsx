import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { Layout } from 'antd'
import Product from './Product'
import Specification from './Specification'
import Header from './Header'

function App() {

  return (
    <Layout>
      <Header />
      <div>
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
      </div>
    </Layout>
  )
}

export default App;
