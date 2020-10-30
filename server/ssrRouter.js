import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import Html from './ssr/Html'
import App from './ssr/app'

const express = require('express')
const router = express.Router()

const serverRenderer = (req, res, next) => {
  const pageData = global.appDataCache ? global.appDataCache.pageData : null
  const locale = global.appDataLocale || 'hk'
  const sheet = new ServerStyleSheet()

  const body = ReactDOMServer.renderToStaticMarkup(sheet.collectStyles(<App />))
  const styles = sheet.getStyleTags()

  res.send(
    Html({
      body,
      styles, // <-- 将样式传递给我们的 Html 模板
      title: pageData[locale]['pc'].pageMeta.title,
      content: pageData[locale]['pc'].pageMeta.content,
      description: pageData[locale]['pc'].pageMeta.description
    })
  )
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/api/changeLocale/:lang', (req, res, next) => {
  console.log(req.params.lang)
  global.appDataLocale = req.params.lang
  res.redirect('/m/loan-promotion')
})

// define the about route
router.get('/:appId', serverRenderer)

module.exports = router
