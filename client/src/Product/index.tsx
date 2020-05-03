import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import ProductList from './ProductList'

const Product: React.SFC = () => {
  let match = useRouteMatch()
  console.log(match.path)

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <div>Test</div>
      </Route>
      <Route path={match.path}>
        <ProductList/>
      </Route>
    </Switch>
  )
}

export default Product
