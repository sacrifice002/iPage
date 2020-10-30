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

function onChange (e) {
  console.log('changed', e)
}

function EditText ({ initProps, onChange }) {
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
    // currentModel.baseProps.style = oldBasePropsStyle
    // factory.updateModel()
    onChange && onChange(oldBasePropsStyle)

  }

  const formName = 'layer'

  return (
    <div className={style.editArea}>
      <Braft  />
    </div>
  )
}

export default EditText
