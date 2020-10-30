import React from 'react'
import { Provider } from 'mobx-react'
import store from './store'
import RouterWrapper from './router/router'

function App () {
  return (
    <Provider store={store}>
      <RouterWrapper />
    </Provider>
  )
}

export default App
