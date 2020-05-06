import Vue from 'vue'

import TextPropEditor from './text-prop-editor'
import CheckboxPropEditor from './checkbox-prop-editor'
import NumberPropEditor from './number-prop-editor'
import TextareaPropEditor from './textarea-prop-editor'
import DatePropEditor from './date-prop-editor'
import WysiwygPropEditor from './wysiwyg-prop-editor'
import { YoutubePropEditor } from './youtube-prop-editor'

const editors = {
  'text-prop-editor': TextPropEditor,
  'checkbox-prop-editor': CheckboxPropEditor,
  'number-prop-editor': NumberPropEditor,
  'textarea-prop-editor': TextareaPropEditor,
  'date-prop-editor': DatePropEditor,
  'wysiwyg-prop-editor': WysiwygPropEditor,
  'youtube-prop-editor': YoutubePropEditor,
}

for (const editorName of Object.keys(editors)) {
  Vue.component(editorName, editors[editorName])
}

export { editors }
