import React from 'react'
import StayTime from './components/staryTime'
import style from './index.module.scss'
import ChartContainer from './components/chartContainer'

function DataView() {
  return (
    <div className={style.dataViewContainer}>
      <ChartContainer title='用户停留时间'>
        <StayTime />
      </ChartContainer>
    </div>
  )
}

export default DataView
