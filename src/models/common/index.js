import React from 'react'
import { uuid } from 'src/utils'
import {
  RadiusSettingOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwitcherOutlined,
  FunctionOutlined
} from '@ant-design/icons'
import EditBaseProps from './../../components/editor/EditBaseProps'
import factory from 'src/models/factory'

class CommonMould {
  id = uuid()
  name = ''
  type = ''
  description = ''
  icon = ''
  content = null
  innerHTML = null
  
  baseProps = {
    style: {
      left: 0,
      top: 0,
      width: '200px',
      height: '100px',
      zIndex: 1
    }
  }
  
  customProps = {}
  
  constructor () {
    this.save()
  }
  
  save () {
  
  }
  
  mountPlugins () {
    const plugins = [
      {
        name: '基础参数设置',
        icon: <RadiusSettingOutlined />,
        render: () => (
          <EditBaseProps
            initProps={this.baseProps}
            onChange={(style) => {
              this.baseProps.style = style
              factory.updateModel()
            }}
          />
        )
      }
    ]
    return plugins
  }
  
}

export default CommonMould
