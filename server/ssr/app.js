import React from 'react'
import styled from 'styled-components'

function App () {
  const appData = global.appDataCache
  const locale = global.appDataLocale || 'hk'
  const page = appData.pageData[locale]

  const MediaWrapper = styled.div`
    .pc {
      display: none;
    }
    .pad {
      display: none;
    }
    .h5 {
      display: none;
    }
    @media only screen and (min-width: 800px) {
      .pc {
        display: block;
      }
    }
    @media only screen and (min-width: 375px) and (max-width: 799px) {
      .pad {
        display: block;
      }
    }
    @media only screen and (max-width: 375px) {
      .h5 {
        display: block;
      }
    }
  `

  return (
    <MediaWrapper>
      {
        Object.keys(page).map((device) => {
          return (
            <div key={device} className={device} style={{
              position: 'relative',
              margin: '0 auto',
              width: page[device].pageStyle.pageWidth,
              height: page[device].pageStyle.pageHeight,
              backgroundColor: page[device].pageStyle.pageBackgroundColor
            }}>
              {
                page[device].pageModels && page[device].pageModels.length > 0 && (
                  page[device].pageModels.map((item, index) => {
                    const properties = item.baseProps.style
                    return (
                      <div
                        key={'layer_' + item.id}
                        style={{ ...properties, position: 'absolute', display: 'block' }}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )
                  })
                )
              }
            </div>
          )
        })
      }
    </MediaWrapper>
  )
}

export default App
