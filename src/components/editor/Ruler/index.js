import React, { PureComponent } from 'react'
import ReactRuler from 'mb-sketch-ruler'
import style from './index.module.scss'
import './index.global.scss'

const thick = 16
const initStartX = -50
const initStartY = -20

export default class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      scale: 1,
      startX: initStartX,
      startY: initStartY,
      lines: {
        h: [0],
        v: [0]
      },
      lang: 'zh-CN', // 中英文
      isShowRuler: true, // 显示标尺
      isShowReferLine: true // 显示参考线
    }
  }

  componentDidMount () {
    // 滚动居中
    // this.$app.scrollLeft = this.$app.getBoundingClientRect().width / 2 - 300 // 300 = #screens.width / 2
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.scale !== prevState.scale) {
      this.handleScroll()
    }
  }
  setAppRef = ref => this.$app = ref
  // setContainerRef = ref => this.$container = ref

  handleScroll = () => {
    const screensRect = document.querySelector('#screens').getBoundingClientRect()
    const canvasRect = document.querySelector('#canvas').getBoundingClientRect()

    // 标尺开始的刻度
    const { scale } = this.state
    const startX = (screensRect.left - canvasRect.left + initStartX) / scale
    const startY = (screensRect.top - canvasRect.top + initStartY) / scale
    // const startX = (screensRect.left + initStartX) / scale
    // const startY = (screensRect.top + initStartY) / scale
    this.setState({ startX, startY })
  }
  handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const nextScale = parseFloat(Math.max(0.2, this.state.scale - e.deltaY / 500).toFixed(2))
      this.setState({ scale: nextScale })
    }
  }
  handleLine = (lines) => {
    this.setState({ lines })
  }
  handleChangeEn = () => {
    this.setState({ lang: 'en' })
  }
  handleChangeCh = () => {
    this.setState({ lang: 'zh-CN' })
  }
  // 显示/影藏标尺
  handleShowRuler = () => {
    const { isShowRuler } = this.state
    this.setState({ isShowRuler: !isShowRuler })
  }
  // 显示/影藏参考线
  handleShowReferLine = () => {
    const { isShowReferLine } = this.state
    this.setState({ isShowReferLine: !isShowReferLine })
  }
  render () {
    const { scale, startX, startY, lines, isShowRuler, isShowReferLine, lang } = this.state
    const { width: canvasWidth, height: canvasHeight, children } = this.props
    const { h, v } = lines

    // const canvasStyle = {
    //   width: '1200px',
    //   height: 'auto',
    //   transform: `scale(${scale})`
    // }

    const shadow = {
      x: initStartX,
      y: initStartY,
      width: 0,
      height: 0
      // width: parseInt(canvasWidth),
      // height: parseInt(canvasHeight)
    }

    return (
      <div className={style.rulerWrapper}>
        {/* <button className='button' onClick={this.handleShowRuler}>{!isShowRuler ? '显示' : '隐藏'}标尺</button> */}
        {/* <button className='button-ch' onClick={this.handleChangeCh}>中</button> */}
        {/* <button className='button-en' onClick={this.handleChangeEn}>英</button> */}
        {/* <div className='scale-value'>{`scale: ${scale}`}</div> */}
        {
          isShowRuler &&
          <ReactRuler
            lang={lang}
            thick={thick}
            scale={scale}
            width={parseInt(canvasWidth) - thick}
            height={parseInt(canvasHeight) - thick}
            startX={startX}
            startY={startY}
            shadow={shadow}
            horLineArr={h}
            verLineArr={v}
            handleLine={this.handleLine}
            cornerActive
            onCornerClick={this.handleCornerClick}

            // 右键菜单props
            isOpenMenuFeature
            handleShowRuler={this.handleShowRuler}
            isShowReferLine={isShowReferLine}
            handleShowReferLine={this.handleShowReferLine}
          />
        }
        {/* <div ref={this.setAppRef} id='screens' className={style.screens} onScroll={this.handleScroll} onWheel={this.handleWheel}> */}
        <div ref={this.setAppRef} id='screens' className={style.screens} onScroll={this.handleScroll}>
          <div ref={this.setContainerRef} id='canvas' className={style.screenContainer}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
