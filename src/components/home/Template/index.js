import React from 'react'
import style from 'index.module.scss'

function App () {
  return (<div className={style.homeContainer}>
    <div>
      <span>全部</span>
      <span>最新</span>
      <span>银行</span>
      <span>保险</span>
      <span>双11</span>
    </div>
    <div className={style.cardBox}>
      <div className={style.card}>
        <div className={style.pic}>
          <img />
        </div>
        <div className={style.desc}>
          <img className={style.logo} />
          <p className={style.name}>银行官网 ZA-CARD 活动页</p>
          <p className={style.tags}>创意活动</p>
        </div>
      </div>
    </div>
  </div>)
}

export default App
