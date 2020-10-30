import React from 'react'
import { Button } from 'antd'
import { EyeOutlined, PlayCircleOutlined, SaveOutlined } from '@ant-design/icons'
import style from './index.module.scss'
function App () {
  return (
    <div className={style.managerHeaderContainer}>
      <div className={style.left}>
        <span className={style.title}>众安·iPage</span>
        <Button type='primary' icon={<SaveOutlined />}>新建作品</Button>
        <Button type='primary' icon={<EyeOutlined />}>预览</Button>
        <Button type='primary' icon={<PlayCircleOutlined />} >发布</Button>
      </div>
      <div className={style.right}>
        <img className={style.avater} src='https://testcdn.zaticdn.com/if/za-if-portal-web/dev/1.0.0/assets/images/user-center/avatar/green@3x.png' />
      </div>
    </div>
  )
}

export default App
