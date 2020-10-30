import React from 'react'
import { Table, Tag, Button, Space } from 'antd'
import { EyeOutlined, PlayCircleOutlined, SaveOutlined } from '@ant-design/icons'
import style from './index.module.scss'
const columns = [
  {
    title: '作品名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: '创建时间',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '关键数据',
    dataIndex: 'data',
    render: number => <span>访问量: {number}</span>
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space>
        <Button type='primary' icon={<SaveOutlined />}>编辑</Button>
        <Button type='primary' icon={<EyeOutlined />}>删除</Button>
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    name: '银行官网ZA Card活动页',
    date: '2020-10-29',
    data: 10,
    tags: ['Bank', '推广']
  },
  {
    key: '2',
    name: 'MGM 活动页',
    date: '2020-10-29',
    tags: ['邀请码活动']
  },
  {
    key: '3',
    name: '双11 推销',
    date: '2020-10-29',
    tags: ['个人']
  }
]

function App () {
  return (
    <div className={style.contentContainer}>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default App
