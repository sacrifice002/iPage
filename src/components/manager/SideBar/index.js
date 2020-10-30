import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Tooltip, Button } from 'antd'
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  FontSizeOutlined,
  PictureOutlined,
  PicCenterOutlined,
  OrderedListOutlined,
  PlusSquareOutlined
} from '@ant-design/icons'
import style from './index.module.scss'
import factory from 'src/models/factory'

const baseElements = [
  {
    id: '1',
    name: '作品',
    type: 'text',
    icon: <FontSizeOutlined />
  },
  {
    id: '2',
    name: '数据',
    type: 'image',
    icon: <PictureOutlined />
  },
  {
    id: '3',
    name: '其他',
    type: 'button',
    icon: <PlusSquareOutlined />
  }
]

function SideBar (props) {
  const [curIndex, setCurIndex] = useState('1')
  function changeTab (id) {
    props.changeTab(id)
    setCurIndex(id)
  }

  return (
    <div className={style.sideBar}>
      <div className={style.componentContainer}>
        {
          baseElements.map((item, index) => {
            return (
              <div className={style.componentItem} onClick={() => { changeTab(item.id) }}>
                <p className={style.icon}>{item.icon}</p>
                <p className={style.name}>{item.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default inject('store')(observer(SideBar))
