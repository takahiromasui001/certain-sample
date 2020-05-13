import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import ProductList from './pages/ProductList'

const Product: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={match.path}>
        <ProductList/>
      </Route>
    </Switch>
  )
}

export default Product
