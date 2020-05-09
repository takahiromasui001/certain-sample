import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItemList from './page/SpecificationItemList'
import CreateSpecificationItem from './page/CreateSpecificationItem'
import EditSpecificationItem from './page/EditSpecificationItem'

const SpecificationItem: React.SFC = () => {
  let match = useRouteMatch()

  return (    
    <Switch>
      <Route path={`${match.path}/new`}>
        <CreateSpecificationItem/>
      </Route>
      <Route path={`${match.path}/:specificationItemId`}>
        <EditSpecificationItem/>
      </Route>
      <Route path={match.path}>
        <SpecificationItemList/>
      </Route>
    </Switch>
  )
}

export default SpecificationItem
