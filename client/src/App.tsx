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
  padding: 10px 50px;
`
const StyledLayout = styled(Layout)`
  height: calc(100vh - 64px);
`

const SidebarWrapper = styled.div`
  padding-top: 5px;
`

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <StyledLayout>
          <SidebarWrapper>
            <Sidebar/>
          </SidebarWrapper>
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
        </StyledLayout>
      </Layout>
    </Router>
  )
}

export default App;
