import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import ProductList from './ProductList'
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'

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
