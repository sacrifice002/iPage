import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Row, Col, Input, Button, Checkbox, InputNumber } from 'antd'
import Braft from 'src/components/editor/Braft'

import style from './index.module.scss'
import factory from 'src/models/factory'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 6
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

function EditBaseProps ({initProps, onChange}) {
  const basePropsStyle = initProps.style
  // const [fields, setFields] = useState([])
  const fields = basePropsStyle && Object.keys(basePropsStyle).map(key => ({
    name: [key],
    value: basePropsStyle[key]
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
    const oldBasePropsStyle = basePropsStyle
    oldBasePropsStyle[field] = value
    onChange && onChange(oldBasePropsStyle)
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

export default EditBaseProps
