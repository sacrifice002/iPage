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
    span: 6
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

function EditImage ({ store }) {
  const { flagModels, flagCurrentModelId } = store
  const currentModel = factory.currentModel
  const basePropsStyle = currentModel && currentModel.baseProps.style
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
    currentModel.baseProps.style = oldBasePropsStyle
    factory.updateModel()
  }

  const formName = 'layer'

  const props = {
    name: 'file',
    action: '/api/file_upload',
    headers: {
      authorization: 'authorization-text'
    },
    onChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        const response = info.file.response
        currentModel.content = `<img style="width: 100%; height: 100%" src='http://localhost:9000/${response.name}' draggable="false"/>`
        factory.updateModel()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
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
        <Col span={12}>
          <Form.Item
            label='上传'
            name='url'
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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

export default inject('store')(observer(EditImage))
