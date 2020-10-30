import React, { useState, useReducer } from 'react'
import { inject, observer } from 'mobx-react'
import factory from 'src/models/factory'
import { Col, Form, Input, Row, Button, Radio, Modal, DatePicker } from 'antd'
import moment from 'moment'
import axios from 'axios'
import style from './index.module.scss'

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

function Publish (props) {
  const { visible, cb, store } = props
  const { appData } = factory
  const { url, publishAt } = appData

  const [form] = Form.useForm()
  const formName = 'publish'
  const formInitialValues = {
    url,
    publishAt: (publishAt > Date.now() ? 2 : 1)
  }
  const [loading, setLoading] = useState(false)
  const [publishTime, setPublishTime] = useState(publishAt === 'now' ? publishAt : new Date(publishAt))
  const [pickerShow, setPickerShow] = useState(formInitialValues.publishAt === 2)

  const onFinish = values => {
    appData.url = values.url
    appData.publishAt = publishTime.getTime()
    factory.saveModel()
    axios.post('/api/editor/save', factory.appData).then((res) => {
      console.log(res)
      setLoading(false)
      handleCancel()
    })
  }

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  }

  const publishChange = change => {
    if (change.publishAt === 1) {
      setPickerShow(false)
      setPublishTime(new Date())
    }
    if (change.publishAt === 2) {
      setPickerShow(true)
      setPublishTime(new Date(publishAt))
    }
    // setPublishTime(e.target.value === 1 ? 'now' : (new Date()).getTime())
  }

  const publishTimeChange = upgradeTime => {
    appData.publishAt = upgradeTime.valueOf()
    setPublishTime(new Date(upgradeTime.valueOf()))
  }

  const range = (start, end) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
  const disabledDate = (current) => {
    // 不能选今天和今天之前的日期
    return current && current < moment()
  }
  const disabledDateTime = () => {
    let hours = moment().hours()// 0~23
    let minutes = moment().minutes()// 0~59
    // 当日只能选择当前时间之后的时间点
    if (publishTime.getDate() === moment().date()) {
      return {
        disabledHours: () => range(0, 23),
        disabledMinutes: () => range(0, 59)
      }
    }
  }

  const handleCancel = () => {
    cb && cb()
  }

  const handleOk = () => {
    setLoading(true)
    form.submit()
  }

  return (
    <Modal
      title='发布'
      centered
      visible={visible}
      // onOk={() => { cb && cb() }}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key='back' onClick={handleCancel}>
          取消
        </Button>,
        <Button key='submit' type='primary' loading={loading} onClick={handleOk}>
          提交
        </Button>
      ]}
    >
      <Form
        {...layout}
        form={form}
        name={formName}
        onFinish={onFinish}
        initialValues={formInitialValues}
        onValuesChange={publishChange}
      >
        <Form.Item
          label='页面URL'
          name='url'
        >
          <Input
            addonBefore='https://bank.za.group/m/'
            placeholder='例: loan-promotion'
          />
        </Form.Item>
        <Form.Item
          label='发布时间'
          name='publishAt'
        >
          <Radio.Group>
            <Radio style={radioStyle} value={1}>
              现在发布
            </Radio>
            <Radio style={radioStyle} value={2}>
              择时发布
              { pickerShow && <DatePicker
                onChange={publishTimeChange}
                showTime={{ defaultValue: moment(publishTime) }}
                defaultValue={moment(publishTime)}
                disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='选择时间'
              />}
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default inject('store')(observer(Publish))
