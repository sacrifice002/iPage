import React, { useState, useEffect, useRef } from 'react'
import Ruler from './../Ruler'
import '../../../style/main.scss'
import style from './index.module.scss'
import Canvas from '../Canvas'

// const Canvas = React.lazy(() => import('../Canvas'))

function Center () {
  const [canvasProps, setCanvasProps] = useState({
    width: 1440,
    height: 960
  })

  const centerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      const styles = window.getComputedStyle(centerRef.current)
      // const styles = style.center
      const { width, height } = styles
      setCanvasProps({
        width,
        height
      })
    }, 2000)
  }, [])

  return (
    <div className={style.center} ref={centerRef}>
      <Ruler
        {...canvasProps}
      >
        <Canvas />
      </Ruler>
    </div>
  )
}

export default Center
