import React, { useReducer, useState } from 'react'
// import { inject, observer } from 'mobx-react'
import style from './index.module.scss'
import factory from 'src/models/factory'
import { localeTypes, canvasWidth, initConfig } from 'src/utils/initData'
import { Button, Radio } from 'antd'

const plainOptions = [
  { label: 'PC', value: 'pc' },
  { label: 'H5', value: 'h5' },
  { label: 'PAD', value: 'pad' }
]
const localeOptions = [
  { label: '繁', value: 'hk' },
  { label: 'EN', value: 'en' }
]

function Preview () {
  const { appData: { pageData } } = factory
  // const { pageStyle, pageMeta } = page
  const [config, dispatch] = useReducer((state, action) => {
    return Object.assign({}, state, action)
  }, initConfig)
  const { locale, device } = config
  const page = pageData[locale][device]
  const { pageStyle, pageMeta, pageModels } = page
  const { pageWidth, pageHeight, pageBackgroundColor } = pageStyle

  window.resizeTo(canvasWidth[device], 800)
  window.moveTo(200, 200)

  // const pageData[][]
  const onChange = type => e => {
    dispatch({ [type]: e.target.value })
  }

  return (
    <div className={style.preview}>
      <div className={style.select}>
        <div className={style.content}>
          <div className={style.localeSwitch}>
            <Radio.Group size='small' options={localeOptions} onChange={onChange('locale')} value={config.locale} optionType='button' buttonStyle='solid' />
          </div>
          <div className={style.deviceSwitch}>
            <Radio.Group size='small' options={plainOptions} onChange={onChange('device')} value={config.device} optionType='button' buttonStyle='solid' />
          </div>
        </div>
      </div>
      <div className={style.pageView} style={{ width: pageWidth, height: pageHeight, backgroundColor: pageBackgroundColor }}>
        {
          pageModels && pageModels.length > 0 && (
            pageModels.map((item, index) => {
              const properties = item.baseProps.style
              return (
                <div
                  key={'layer_' + item.id}
                  className={style.renderComponent}
                  style={{ ...properties }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )
            })
          )
        }
      </div>
    </div>
  )
}

// export default inject('store')(observer(Preview))
export default Preview
