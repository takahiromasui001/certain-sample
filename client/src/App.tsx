import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { Layout } from 'antd'
import Product from './Product'
import styled from 'styled-components'
import Specification from './Specification'
import Header from './Header'
import Sidebar from './Sidebar'

const { Content } = Layout

const StyledContent = styled(Content)`
  padding: 30px 50px;
`

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Layout>
          <Sidebar/>
          <Layout>
            <StyledContent >
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
            </StyledContent>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App;
