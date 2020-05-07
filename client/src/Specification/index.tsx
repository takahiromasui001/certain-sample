import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItem from './SpecificationItem'
import CreateSpecificationItem from './SpecificationItem/CreateSpecificationItem'
import EditSpecificationItem from './SpecificationItem/EditSpecificationItem'
import SpecificationList from './SpecificationList'

const Specification: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:id/specification_items/new`}>
        <CreateSpecificationItem/>
      </Route>
      <Route path={`${match.path}/:id/specification_items/:specificationItemId`}>
        <EditSpecificationItem/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <SpecificationItem/>
      </Route>
      <Route path={match.path}>
        <SpecificationList/>
      </Route>
    </Switch>
  )
}

export default Specification
