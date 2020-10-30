import React, { useState, useEffect } from 'react'
import SideBar from '../../components/manager/SideBar'
import Header from '../../components/manager/Header'
import Content from '../../components/manager/Content'
import style from './index.module.scss'

function App () {
  const [curIndex, setCurIndex] = useState(0)
  const tabs = [
    <Content />,
    <p>123</p>,
    <p>456</p>
  ]

  function changeTab (id) {
    console.log('id', id)
    setCurIndex(parseInt(id) - 1)
  }

  return (
    <div className={style.managerContainer}>
      <Header />
      <div className={style.content}>
        <SideBar changeTab={changeTab} />
        <div className={style.tabs}>
          {tabs[curIndex]}
        </div>
      </div>
    </div>
  )
}

export default App
