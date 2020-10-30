import React from 'react'
import style from './index.module.scss'

export default function ChartContainer (props) {
  return (
    <div className={style.container}>
      <div className={style.titleContainer}>{ props.title }</div>
      { props.children }
    </div>
  )
}