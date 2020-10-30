// import 'babel-polyfill';

import React from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './app'

const rootEl = document.getElementById('root')

render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(
      <NextApp />,
      rootEl
    )
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
