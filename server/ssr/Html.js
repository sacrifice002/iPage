/**
 * Html
 * 这个 Html.js 文件充当了一个模板，我们将所有生成的应用程序代码插入其中
 * 成的应用程序字符串插入进去。
 */
const Html = ({ body, styles, title, content, description }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="description" content="${description}">
      <meta name="keywords" content="${content}">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div style="position: absolute; top: 0px; left: 0px; z-index: 99">
        <a href="/m/api/changeLocale/hk">繁</a>
        |
        <a href="/m/api/changeLocale/en">en</a>
      </div>
      <div id="root">${body}</div>
    </body>
  </html>
`

export default Html
