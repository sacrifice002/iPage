import React, { useEffect, useState } from 'react'
import * as cn from 'classnames'
import { Rnd } from 'react-rnd'
import '../../../style/main.scss'
import style from './index.module.scss'
import { inject, observer } from 'mobx-react'
import factory from 'src/models/factory'

const elementMap = {
  'text': `<p>Hello World!</p>`,
  'image': <img src='' />,
  'button': <button>click button</button>
}

function Canvas ({ store }) {
  const { flagModels, flagCurrentModelId, flagCurrentHoverLayerId } = store
  const page = factory.page
  const models = factory.models
  const config = factory.currentConfig
  const currentModel = factory.currentModel
  const currentModelId = currentModel && currentModel.id
  const currentHoverLayerId = factory.currentHoverLayer && factory.currentHoverLayer.id

  const { locale, device } = config
  const { pageStyle, pageMeta } = page
  const { pageWidth, pageHeight, pageBackgroundColor } = pageStyle

  const setPosition = (d) => {
    let { x: left } = d

    let oldBasePropsStyle = currentModel.baseProps.style
    let { width } = oldBasePropsStyle
    const leftMax = pageWidth - parseInt(width)

    left = left < 0 ? 0 : left >= leftMax ? leftMax : left

    oldBasePropsStyle.left = left
    oldBasePropsStyle.top = d.y < 0 ? 0 : d.y
    currentModel.baseProps.style = oldBasePropsStyle
    factory.updateModel()
  }

  const setStyle = (ref) => {
    let { width, height } = ref.style
    width = parseInt(width)
    width = width < 20 ? 20 : width >= pageWidth ? pageWidth : width

    let oldBasePropsStyle = currentModel.baseProps.style
    oldBasePropsStyle.width = width
    oldBasePropsStyle.height = height
    currentModel.baseProps.style = oldBasePropsStyle
    factory.updateModel()
  }

  const onSelected = id => e => {
    e.preventDefault()
    e.stopPropagation()
    factory.focusModel(id)
  }

  useEffect(() => {
    function delEventFunc (event) {
      const key = event.key // const {key} = event; ES6+
      if (key === 'Delete') {
        factory.deleteModel()
        return false
      }
    }

    currentModel && document.addEventListener('keydown', delEventFunc)
    return () => {
      document.removeEventListener('keydown', delEventFunc)
    }
  }, [currentModel])

  return (
    <div className={style.editor} style={{ marginLeft: '66px', 'width': pageWidth, 'height': pageHeight, backgroundColor: pageBackgroundColor }} onClick={onSelected()}>
      {
        models.length > 0 && models.map((item, index) => {
          const properties = item.baseProps.style
          const children = (
            <div
              // style={{ ...properties }}
              style={{ width: '100%', height: '100%' }}
              key={'element_' + item.id}
              dangerouslySetInnerHTML={{ __html: item.content || elementMap[item.type] }}
            />
          )

          return currentModelId === item.id ? (
            <Rnd
              key={'layer_' + item.id}
              size={{ width: properties.width, height: properties.height }}
              position={{ x: properties.left, y: properties.top }}
              onDragStop={(e, d) => { setPosition(d) }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setPosition(position)
                setStyle(ref)
              }}
              style={{ zIndex: 99 }}
            >
              <div className={cn(style.editComponent, { [style.layerHover]: item.id === currentHoverLayerId })}>
                {children}
                <div className={style.controlBox}>
                  <span className={style.rotate} />
                  <span className={cn(style.side, style.top)} />
                  <span className={cn(style.side, style.left)} />
                  <span className={cn(style.side, style.right)} />
                  <span className={cn(style.side, style.bottom)} />
                  <span className={style.topLeft} />
                  <span className={style.topRight} />
                  <span className={style.bottomLeft} />
                  <span className={style.bottomRight} />
                </div>
              </div>
            </Rnd>
          ) : (
            <div
              key={'layer_' + item.id}
              className={cn(style.renderComponent, { [style.layerHover]: item.id === currentHoverLayerId })}
              onClick={onSelected(item.id)}
              style={{ ...properties }}
            >
              {children}
            </div>
          )
        })
      }
    </div>
  )
}

export default inject('store')(observer(Canvas))
