import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"
import SpecificationItemList from './page/SpecificationItemList'

const SpecificationItem: React.SFC = () => {
  let match = useRouteMatch()

  return (    
    <Switch>
      <Route path={match.path}>
        <SpecificationItemList/>
      </Route>
    </Switch>
  )
}

export default SpecificationItem
