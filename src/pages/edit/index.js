import React from 'react'
import { inject, observer } from 'mobx-react'
import style from './index.module.scss'

import Editor from '../../components/editor/Frame'

function HomeIndex ({ store }) {
  return (
    <div className={style.editor}>
      <Editor />
    </div>
  )
}

export default inject('store')(observer(HomeIndex))
