import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Row, Col, Input, Button, Checkbox, InputNumber, Switch } from 'antd'
import { SketchPicker } from 'react-color'

import style from './index.module.scss'
import factory from 'src/models/factory'

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

function onChange (e) {
  console.log('changed', e)
}

function EditPage ({ store }) {
  const { flagModels, flagCurrentModelId } = store
  const currentModel = factory.currentModel
  const page = factory.page
  const { pageMeta } = page
  // const [fields, setFields] = useState([])
  const fields = pageMeta && Object.keys(pageMeta).map(key => ({
    name: [key],
    value: pageMeta[key]
  }))

  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const updateProperty = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { id, value } = e.currentTarget
    const field = id.split('_')[1]
    const oldPageMeta = pageMeta
    oldPageMeta[field] = value
    factory.page.pageMeta = oldPageMeta
    factory.updateModel()
  }

  const formName = 'layer'

  const [backgroundColor, setBackgroundColor] = useState(page.pageStyle.pageBackgroundColor)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const handleChangeComplete = (color) => {
    setBackgroundColor(color.hex)
    factory.page.pageStyle.pageBackgroundColor = color.hex
    factory.updateModel()
  }

  const CustomizedForm = ({ onChange, fields }) => (
    <Form
      {...layout}
      layout='horizontal'
      name={formName}
      initialValues={{}}
      fields={fields}
      // onValuesChange={(changedFields, allFields) => {
      //   onChange(changedFields, allFields)
      //   // onChange(allFields)
      // }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            label='标题title'
            name='title'
          >
            <Input onPressEnter={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label='keywords'
            name='keywords'
          >
            <Input onPressEnter={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label='description'
            name='description'
          >
            <Input onPressEnter={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label='content'
            name='content'
          >
            <Input onPressEnter={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label='导航组件'
            name='header'
          >
            <Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label='底部组件'
            name='header'
          >
            <Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ height: displayColorPicker ? '400px' : '20px' }}>
        <Col span={4}>
          <span>背景色:</span>
        </Col>
        <Col span={12}>
          <div className={style.swatch} onClick={() => { setDisplayColorPicker(true) }}>
            <div className={style.color} style={{ backgroundColor }} />
          </div>
          { displayColorPicker && (
            <div className={style.popover}>
              <div className={style.cover} onClick={() => { setDisplayColorPicker(false) }} />
              <SketchPicker
                color={backgroundColor}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          )}
        </Col>
      </Row>
    </Form>
  )

  return (
    <div className={style.editArea}>
      <CustomizedForm
        fields={fields}
        onChange={(event, allFields) => {
          updateProperty(event)
        }}
      />
    </div>
  )
}

export default inject('store')(observer(EditPage))
