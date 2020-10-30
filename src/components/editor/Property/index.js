import React, { useState, useEffect } from 'react'
import '../../../style/main.scss'
import style from './index.module.scss'
import { Tabs, Menu, Collapse } from 'antd'
import {
  RadiusSettingOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwitcherOutlined,
  FunctionOutlined
} from '@ant-design/icons'
import EditText from '../EditText'
import LayerMenu from '../LayerMenu'
import EditPage from '../EditPage'
import EditImage from '../EditImage'
import { inject, observer } from 'mobx-react'
import factory from 'src/models/factory'
import EditButton from 'src/components/editor/EditButton'

const { SubMenu } = Menu
const { Panel } = Collapse

function Property ({ store }) {
  const { flagCurrentModelId } = store
  const { page, currentModel } = factory
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  function callback (key) {
    console.log(key)
  }

  const editPlugin = {
    'text': <EditText />,
    'button': <EditButton />,
    'image': <EditImage />
  }
  
  const plugins = currentModel ? currentModel.mountPlugins() : []

  return (
    <div className={style.property}>
      <Collapse expandIconPosition='right' defaultActiveKey={['2']}>
        <Panel header={
          <>
            <SwitcherOutlined />&nbsp;
            <span>图层</span>
          </>
        } key='1'>
          <LayerMenu />
        </Panel>
        <Panel header={
          <>
            <SettingOutlined />&nbsp;
            <span>页面参数设置</span>
          </>
        } key='2'>
          <EditPage />
        </Panel>
        {
          plugins && plugins.map((plugin, index)=>{
            return (
              <Panel header={
                <>
                  {plugin.icon}&nbsp;
                  <span>{plugin.name}</span>
                </>
              } key={index + 3}>
                {plugin.render()}
              </Panel>
            )
          })
        }
        {/*{*/}
        {/*  currentModel && (*/}
        {/*    <Panel header={*/}
        {/*      <>*/}
        {/*        <FunctionOutlined />&nbsp;*/}
        {/*        <span>事件设置</span>*/}
        {/*      </>*/}
        {/*    } key='4'>*/}
        {/*      Event*/}
        {/*    </Panel>*/}
        {/*  )*/}
        {/*}*/}
        {/*{*/}
        {/*  currentModel && (*/}
        {/*    <Panel header={*/}
        {/*      <>*/}
        {/*        <NodeIndexOutlined />&nbsp;*/}
        {/*        <span>动画设置</span>*/}
        {/*      </>*/}
        {/*    } key='5'>*/}
        {/*      Animation*/}
        {/*    </Panel>*/}
        {/*  )*/}
        {/*}*/}
      </Collapse>
    </div>
  )
}

export default inject('store')(observer(Property))
