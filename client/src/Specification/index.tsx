import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItem from './SpecificationItem'
import SpecificationList from './pages/SpecificationList'
import CreateSpecification from './pages/CreateSpecification'
import EditSpecification from './pages/EditSpecification'

const Specification: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:id/specification_items`}>
        <SpecificationItem/>
      </Route>
      <Route path={`${match.path}/new`}>
        <CreateSpecification/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <EditSpecification/>
      </Route>
      <Route path={match.path}>
        <SpecificationList/>
      </Route>
    </Switch>
  )
}

export default Specification
