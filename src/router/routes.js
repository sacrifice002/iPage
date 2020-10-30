import { lazy } from 'react'
import Layout from '../pages/layout/main'
import LazyHOC from '../components/common/lazyHOC'
import Home from '../pages/home'
import Edit from '../pages/edit'
import Manager from '../pages/manager'
import DataView from '../pages/dataView'
import Preview from '../pages/preview'
import NotFound from '../pages/common/404'
// const Edit = lazy(() => import('../pages/edit'))
// const DataView = lazy(() => import('../pages/dataView'))
// const Preview = lazy(() => import('../pages/preview'))
// const NotFound = lazy(() => import('../pages/common/404'))

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/edit',
    exact: true,
    component: Layout,
    routes: [
      {
        path: '/',
        component: Edit
      }
    ]
  }, {
    path: '/data',
    exact: true,
    component: DataView
  }, {
    path: '/manager',
    exact: true,
    component: Manager
  }, {
    path: '/pre',
    exact: true,
    component: Preview
  }, {
    path: '*',
    component: NotFound
  }
]

export { routes }
