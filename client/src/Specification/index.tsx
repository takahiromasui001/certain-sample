import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItem from './SpecificationItem'
import SpecificationList from './pages/SpecificationList'

const Specification: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:id/specification_items`}>
        <SpecificationItem/>
      </Route>
      <Route path={match.path}>
        <SpecificationList/>
      </Route>
    </Switch>
  )
}

export default Specification
