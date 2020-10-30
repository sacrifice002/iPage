import TextModel from 'src/models/text'
import store from 'src/store'
import * as message from 'src/store/message'
import { deepCompare } from 'src/utils'
import { initConfig, localeTypes, deviceTypes, canvasWidth, canvasHeight } from 'src/utils/initData'
import ImageModel from 'src/models/image'
import ButtonModel from 'src/models/button'

const defaultPage = {
  pageStyle: {
    pageWidth: 1200,
    pageHeight: 1000,
    pageBackgroundColor: '#ffffff'
  },
  pageMeta: {
    title: 'title',
    keywords: 'keywords',
    description: 'description',
    content: 'content',
    shareUrl: 'shareUrl'
  },
  pageModels: []
}

const defaultPageData = {}

localeTypes.forEach(locale => {
  deviceTypes.forEach(device => {
    if (!defaultPageData[locale])defaultPageData[locale] = {}
    const copyPage = JSON.parse(JSON.stringify(defaultPage))
    defaultPageData[locale][device] = Object.assign({}, copyPage, {
      pageLocale: locale,
      pageType: device,
      pageStyle: {
        pageWidth: canvasWidth[device],
        pageHeight: canvasHeight,
        pageBackgroundColor: '#ffffff'
      }
    })
  })
})

const defaultAppData = {
  id: 'uuid',
  url: 'test',
  status: 'draft',
  createAt: (new Date()).getTime(),
  publishAt: (new Date()).getTime(),
  disableAt: (new Date()).getTime(),
  pageData: defaultPageData
}

class Factory {
  key = 'ZA_ACTIVITY_CONFIG_DATA'
  currentConfig = initConfig
  currentModel = null
  currentHoverLayer = null

  constructor () {
    this.appData = JSON.parse(window.localStorage.getItem(this.key)) || defaultAppData
    const { locale, device } = this.currentConfig
    this.page = this.appData.pageData[locale][device]
    this.models = this.page.pageModels || []

    this.updatePage()
  }

  updatePage () {
    const { locale, device } = this.currentConfig
    this.page = this.appData.pageData[locale][device]
    this.models = this.page.pageModels || []
    store.update(message.MOBX_STATUS_CHANGE_FLAG_$_models)
  }

  changeConfig (config, cb) {
    const newConfig = Object.assign({}, this.currentConfig, config)
    if (!deepCompare(this.currentConfig, newConfig)) {
      this.currentConfig = newConfig
      this.updatePage()
      cb && cb()
    }
  }

  generateModel (type) {
    let model = null
    switch (type) {
      case 'text':
        model = new TextModel()
        break
      case 'image':
        model = new ImageModel()
        break
      case 'button':
        model = new ButtonModel()
        break
      case 'list':
        break
      case 'banner':
        break
    }

    this.models.unshift(model) && this.saveModel()
    this.focusModel(model.id)
    return model
  }

  focusModel (id) {
    this.currentModel = this.findModel(id)
    store.update(message.MOBX_STATUS_CHANGE_FLAG_$_currentModelId)
  }

  saveModel () {
    // const { locale, device } = this.currentConfig
    // this.page = this.appData.pageData[locale][device]
    // this.page.pageModels = this.models
    const value = JSON.stringify(this.appData)
    window.localStorage.setItem(this.key, value)
    store.update(message.MOBX_STATUS_CHANGE_FLAG_$_models)
  }

  updateModel (id, updateModel) {
    // const index = this.models.findIndex((value, index) => value.id === id)
    // console.log(this.models[index], updateModel)
    // if (deepCompare(this.models[index], updateModel)) return false
    // this.models[index] = updateModel
    this.saveModel()
  }

  deleteModel () {
    const delIndex = this.models.findIndex((value, index) => value.id === this.currentModel.id)
    console.log(delIndex)
    this.models.splice(delIndex, 1)
    this.saveModel()
  }

  findModel (id) {
    return this.models.find((value, index) => value.id === id)
  }

  hoverModelLayer (id) {
    this.currentHoverLayer = this.models.find((value, index) => value.id === id)
    store.update(message.MOBX_STATUS_CHANGE_FLAG_$_currentHoverLayerId)
  }
}

export default new Factory()
