import CommonMould from 'src/models/common'
import * as banner from 'src/resources/image/banner.png'

// for (let i in document.images) document.images[i].ondragstart = imgdragstart
//
// function imgdragstart () {
//   return false
// }

class ImageModel extends CommonMould {
  constructor (props) {
    super(props)
    this.content = `<img style="width: 100%; height: 100%" src='${banner}' draggable="false"/>`
    this.type = 'image'
    this.baseProps.style.zIndex = 1
  }

  generateHtml () {
    this.content = `<p>text</p>`
  }
}

export default ImageModel
