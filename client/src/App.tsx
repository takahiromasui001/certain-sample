import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { Layout } from 'antd'
import Product from './Product'
import Specification from './Specification'
import Header from './Header'
import Sidebar from './Sidebar'

function App() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sidebar/>
        <Layout>
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
                  <Specification/>
                </Route>
              </Switch>
            </Router>
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App;
