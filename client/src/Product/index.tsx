import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import ProductList from './pages/ProductList'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'

const Product: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <CreateProduct/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <EditProduct/>
      </Route>
      <Route path={match.path}>
        <ProductList/>
      </Route>
    </Switch>
  )
}

export default Product
