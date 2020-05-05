import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationDetail from './SpecificationDetail'

const Specification: React.SFC = () => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <SpecificationDetail/>
      </Route>
      <Route path={match.path}>
        <div>Specification</div>
      </Route>
    </Switch>
  )
}

export default Specification
