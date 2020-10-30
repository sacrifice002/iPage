import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { ConfigProvider } from 'antd'
import { routes } from './routes'
// import { inject, observer } from 'mobx-react'

class RouterWrapper extends Component {
  render () {
    return (
      <ConfigProvider>
        <Router history={createBrowserHistory()}>
          <Switch>
            {routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
          </Switch>
        </Router>
      </ConfigProvider>
    )
  }
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes (route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} parentRoute={route} />
      )}
    />
  )
}

export default RouterWrapper
