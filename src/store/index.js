/* eslint-disable */
import { observable, action, computed, toJS } from 'mobx'
import {
  MOBX_STATUS_CHANGE_FLAG_$_models,
  MOBX_STATUS_CHANGE_FLAG_$_currentModelId,
  MOBX_STATUS_CHANGE_FLAG_$_currentHoverLayerId, MOBX_STATUS_CHANGE_FLAG_$_config
} from 'src/store/message'

class Store {

  @observable
  flagConfig = Symbol(MOBX_STATUS_CHANGE_FLAG_$_config)
  // flagModels = null
  
  @observable
  flagModels = Symbol(MOBX_STATUS_CHANGE_FLAG_$_models)
  // flagModels = null

  @observable
  flagCurrentModelId = Symbol(MOBX_STATUS_CHANGE_FLAG_$_currentModelId)
  // flagCurrentModelId = null

  @observable
  flagCurrentHoverLayerId = Symbol(MOBX_STATUS_CHANGE_FLAG_$_currentHoverLayerId)
  // flagCurrentHoverLayerId = null

  @action
  update (type) {
    this[type] = Symbol(type)
  }

}

export default new Store()
