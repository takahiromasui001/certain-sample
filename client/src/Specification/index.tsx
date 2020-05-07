import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItem from './SpecificationItem'
import CreateSpecificationItem from './SpecificationItem/CreateSpecificationItem'

const Specification: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:id/specification_items/new`}>
        <CreateSpecificationItem/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <SpecificationItem/>
      </Route>
      <Route path={match.path}>
        <div>Specification</div>
      </Route>
    </Switch>
  )
}

export default Specification
