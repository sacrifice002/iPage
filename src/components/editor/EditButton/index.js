import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Row, Col, Input, Button, Checkbox, InputNumber, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import style from './index.module.scss'
import factory from 'src/models/factory'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

function EditButton ({ store }) {
  const { flagModels, flagCurrentModelId } = store
  const currentModel = factory.currentModel
  const basePropsStyle = currentModel && currentModel.baseProps.style
  // const [fields, setFields] = useState([])
  const fields = basePropsStyle && Object.keys(basePropsStyle).map(key => ({
    name: [key],
    value: basePropsStyle[key]
  }))

  fields.push({
    name: 'innerHTML',
    value: currentModel.innerHTML
  })

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
    if (field === 'innerHTML') {
      currentModel.innerHTML = value
      currentModel.generateContent()
    } else {
      const oldBasePropsStyle = basePropsStyle
      oldBasePropsStyle[field] = value
      currentModel.baseProps.style = oldBasePropsStyle
    }

    factory.updateModel()
  }

  const formName = 'layer'

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
        <Col span={12}>
          <Form.Item
            label='坐标x'
            name='left'
          >
            <InputNumber
              // defaultValue={100}
              min={0}
              // formatter={value => `${value}%`}
              // parser={value => value.replace('%', '')}
              onPressEnter={onChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='坐标y'
            name='top'
          >
            <InputNumber
              // defaultValue={100}
              min={0}
              // formatter={value => `${value}%`}
              // parser={value => value.replace('%', '')}
              onPressEnter={onChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label='宽度'
            name='width'
          >
            <InputNumber
              // defaultValue={100}
              min={0}
              max={800}
              // formatter={value => `${value}%`}
              // parser={value => value.replace('', '')}
              onPressEnter={onChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='高度'
            name='height'
          >
            <InputNumber
              // defaultValue={100}
              min={0}
              // formatter={value => `${value}%`}
              // parser={value => value.replace('%', '')}
              onPressEnter={onChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label='按钮文本'
            name='innerHTML'
          >
            <Input onPressEnter={onChange} />
          </Form.Item>
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

export default inject('store')(observer(EditButton))
