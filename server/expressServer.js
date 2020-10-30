import path from 'path'
import fs from 'fs'
import express from 'express'

const bodyParser = require('body-parser')
const formidable = require('formidable')
const port = 9000

const expressServer = express()
const ssrRouter = require('./ssrRouter')

expressServer.use(express.static('public'))
// body-parser 用于解析post数据  application/x-www.form-urlencoded
expressServer.use(bodyParser.json())
expressServer.use(bodyParser.urlencoded({ extended: true }))

expressServer.post('/api/file_upload', function (req, res, next) {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../public')
  form.keepExtensions = true

  form.parse(req, function (err, fields, files) {
    if (err) next(err)
    const { file } = files
    const { path: oldPath, name } = file
    const newPath = path.resolve(form.uploadDir, name)
    fs.renameSync(oldPath, newPath)
    res.send({ status: 200, name, msg: 'success' })
  })
})

expressServer.post('/api/editor/save', (req, res) => {
  global.appDataCache = req.body
  res.send('success')
})

// tell the app to use the above rules
expressServer.use('/m', ssrRouter)

// app.use(express.static('./build'))
expressServer.listen(port, () => {
  console.log(`SSR running on port ${port}`)
})
