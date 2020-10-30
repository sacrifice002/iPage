import React from 'react'
import { List, Typography, Divider } from 'antd'
import '../../../style/main.scss'
import style from './index.module.scss'
import { inject, observer } from 'mobx-react'
import factory from 'src/models/factory'

function LayerMenu ({ store }) {
  const { flagModels } = store
  const models = factory.models

  const selectLayer = (id) => {
    factory.focusModel(id)
  }

  const handleEnter = (id) => {
    factory.hoverModelLayer(id)
  }
  const handleOut = () => {
    factory.hoverModelLayer(null)
  }
  return (
    <div className={style.container}>
      <List
        size='small'
        bordered
        dataSource={models}
        renderItem={item =>
          <List.Item className={style.layerItem}>
            <div
              onClick={() => { selectLayer(item.id) }}
              onMouseEnter={() => { handleEnter(item.id) }}
              onMouseLeave={handleOut}
            >
              {`${item.name} (id: ${item.id})`}
            </div>
          </List.Item>
        }
      />
    </div>
  )
}

export default inject('store')(observer(LayerMenu))
