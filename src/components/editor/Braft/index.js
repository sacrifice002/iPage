import 'braft-editor/dist/index.css'
import React, { useEffect, useState } from 'react'
import BraftEditor from 'braft-editor'
import './index.css'
import { inject, observer } from 'mobx-react'
import factory from 'src/models/factory'

function Braft ({ store }) {
  const { flagCurrentModelId } = store
  const { currentModel } = factory
  const editorState = BraftEditor.createEditorState(currentModel && currentModel.content)

  const handleChange = (editorState) => {
    currentModel.content = editorState.toHTML()
    factory.updateModel()
  }

  const controls = [
    'headings', 'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'separator', 'text-indent', 'text-align', 'separator',
    'list-ul', 'list-ol', 'blockquote', 'separator',
    'link', 'separator', 'hr', 'separator',
    // 'media', 'separator',
    'clear', 'remove-styles'
  ]

  return (
    <div className='editor-wrapper'>
      <BraftEditor
        controls={controls}
        value={editorState}
        onChange={(e) => { handleChange(e) }}
      />
    </div>
  )
}

export default inject('store')(observer(Braft))
