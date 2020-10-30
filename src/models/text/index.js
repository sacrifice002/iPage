import CommonMould from 'src/models/common'
import EditBaseProps from 'src/components/editor/EditBaseProps'
import factory from 'src/models/factory'
import EditText from 'src/components/editor/EditText'

class TextModel extends CommonMould {
  constructor (props) {
    super(props)
    this.type = 'text'
    this.content = `<p>text</p>`
    this.baseProps.style.zIndex = 9
  }

  generateHtml () {
    this.content = `<p>text</p>`
  }
  
  
  mountPlugins () {
    const plugins = super.mountPlugins()
    plugins.push({
      name: '基础参数设置',
      icon: <RadiusSettingOutlined />,
      render: () => (
        <EditText
          initProps={this.baseProps}
          onChange={(style) => {
            this.baseProps.style = style
            factory.updateModel()
          }}
        />
      )
    })
    return plugins
  }
  
}

export default TextModel
