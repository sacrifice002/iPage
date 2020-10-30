import React, { useContext } from 'react'
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
    name: '文本框',
    type: 'text',
    icon: <FontSizeOutlined />
  },
  {
    id: '2',
    name: '图片',
    type: 'image',
    icon: <PictureOutlined />
  },
  {
    id: '3',
    name: '按钮',
    type: 'button',
    icon: <PlusSquareOutlined />
  }
]

const components = [
  {
    id: '4',
    name: '列表',
    type: 'list',
    icon: <OrderedListOutlined />
  },
  {
    id: '5',
    name: '轮播图',
    type: 'banner',
    icon: <PicCenterOutlined />
  }
]

function SideBar ({ store }) {
  // const store = useContext(store)
  const insertElement = (type) => () => {
    if (['list', 'banner'].includes(type)) return false
    factory.generateModel(type)
  }

  return (
    <div className={style.sideBar}>
      {/* 标题栏 */}
      {/* <hr /> */}
      {/* <div> */}
      {/*  基本元素 */}
      {/* </div> */}

      <div className={style.componentContainer}>
        {
          baseElements.map((item, index) => {
            return (
              <Tooltip key={'component_' + index} placement='right' title={item.name}>
                <div className={style.componentItem} onClick={insertElement(item.type)}>
                  {item.icon}
                </div>
              </Tooltip>
            )
          })
        }
      </div>
      <div className={style.componentContainer}>
        {
          components.map((item, index) => {
            return (
              <Tooltip key={'component_' + index} placement='right' title={item.name}>
                <div className={style.componentItem} onClick={insertElement(item.type)}>
                  {item.icon}
                </div>
              </Tooltip>
            )
          })
        }
      </div>
    </div>
  )
}

export default inject('store')(observer(SideBar))
