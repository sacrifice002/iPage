import CommonMould from 'src/models/common'

class ButtonModel extends CommonMould {
  constructor (props) {
    super(props)
    this.type = 'button'
    this.baseProps.style.height = '50px'
    this.customProps.style = {
      borderRadius: parseInt(this.baseProps.style.height) / 2 + 'px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ffffff'
    }
    this.innerHTML = 'click me'
    const { borderRadius, borderWidth, borderStyle, borderColor } = this.customProps.style
    this.content = `
      <button
        style="
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 1;
          cursor: pointer;
          border-radius: ${borderRadius};
          border: ${borderWidth} ${borderStyle} ${borderColor}
        "
      >${this.innerHTML}</button>
    `
    this.baseProps.style.zIndex = 9
  }

  generateContent () {
    const { borderRadius, borderWidth, borderStyle, borderColor } = this.customProps.style
    this.content = `<button
        style="
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 1;
          cursor: pointer;
          border-radius: ${borderRadius};
          border: ${borderWidth} ${borderStyle} ${borderColor}
        "
      >${this.innerHTML}</button>`
  }
}

export default ButtonModel
