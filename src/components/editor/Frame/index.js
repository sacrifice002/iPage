import React, { lazy } from 'react'

import style from './index.module.scss'
// import style from '$editor/components/Frame/index.module.scss'
// import style from 'src/editor/components/Frame/index.module.scss'
import Header from '../Header'
import SideBar from '../SideBar'
import Center from '../Center'
import Property from '../Property'

// const Header = lazy(() => import('../Header'))
// const SideBar = lazy(() => import('../SideBar'))
// const Center = lazy(() => import('../Center'))
// const Property = lazy(() => import('../Property'))

const moduleList = [
  <SideBar />,
  <Center />,
  <Property />
]

function Editor () {
  return (
    <>
      <section className={style.header}>
        <Header />
      </section>
      <section className={style.container}>
        {
          moduleList.map((item, index) => (
            <div className={style.moduleItem} key={'module_' + index}>
              {item}
            </div>
          ))
        }
      </section>
    </>
  )
}

export default Editor
