const localeTypes = ['hk', 'en']
// const deviceTypes = ['pc', 'h5', 'pad']
const deviceTypes = ['pc', 'h5']
const canvasWidth = {
  pc: 1200,
  h5: 375,
  pad: 750
}
const canvasHeight = 2000
const initConfig = { locale: localeTypes[0], device: deviceTypes[0] }

export {
  localeTypes,
  deviceTypes,
  canvasWidth,
  canvasHeight,
  initConfig
}
