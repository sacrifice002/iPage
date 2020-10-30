import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import '../../style/main.scss'
import 'antd/dist/antd.css'

class Layout extends Component {
  render () {
    const { match, routes = [] } = this.props
    const parentPath = match.path
    return (
      <>
        {/* <p>Layout Page</p> */}

        <Switch>
          {routes.map(route => {
            const routeKey = parentPath + route.path
            return (
              <Route
                key={routeKey}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes || []} />}
              />
            )
          })}
        </Switch>
      </>
    )
  }
}

export default Layout
