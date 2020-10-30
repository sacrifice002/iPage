import React, { useState, useReducer } from 'react'
import '../../../style/main.scss'
import style from './index.module.scss'
import { Radio, Button, Modal } from 'antd'
import factory from 'src/models/factory'
import { EyeOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { initConfig } from 'src/utils/initData'
import Publish from 'src/components/editor/Publish'

const plainOptions = [
  { label: 'PC', value: 'pc' },
  { label: 'H5', value: 'h5' },
  // { label: 'PAD', value: 'pad' }
]
const localeOptions = [
  { label: '繁', value: 'hk' },
  { label: 'EN', value: 'en' }
]

function Header () {
  const [config, dispatch] = useReducer((state, action) => {
    return Object.assign({}, state, action)
  }, initConfig)

  const [publish, setPublish] = useState(false)

  const onChange = type => e => {
    const configChange = { [type]: e.target.value }
    factory.changeConfig(configChange, () => {
      dispatch(configChange)
    })
  }

  const openPreview = () => {
    window.open('/pre', 'newwindow', 'height=800,width=1200,top=40,left=200,toolbar=no,menubar=no')
  }

  return (
    <div className={style.container} >
      {/* ⚛ */}
      <div className={style.contentLeft}>
        <div className={style.logo} >
          <img src={'https://cdn.za.group/if/zaif-cps-seagull-service/20200805/logo-green_919.svg'} />
          <span dangerouslySetInnerHTML={{ __html: '众安国际·H5编辑器🧚' }} />
        </div>
      </div>
      <div className={style.contentRight}>
        <div className={style.localeSwitch}>
          <Radio.Group options={localeOptions} onChange={onChange('locale')} value={config.locale} optionType='button' buttonStyle='solid' />
        </div>
        <div className={style.deviceSwitch}>
          <Radio.Group options={plainOptions} onChange={onChange('device')} value={config.device} optionType='button' buttonStyle='solid' />
        </div>
        <div className={style.actions}>
          <Button type='primary' icon={<EyeOutlined />} onClick={openPreview} >预览</Button>
          <Button type='primary' icon={<PlayCircleOutlined />} onClick={() => setPublish(true)} >发布</Button>
        </div>
      </div>
      <Publish visible={publish} cb={() => { setPublish(false) }} />
    </div>
  )
}

export default Header
