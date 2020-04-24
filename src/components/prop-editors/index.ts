import Vue from 'vue'

import TextPropEditor from './text-prop-editor'
import CheckboxPropEditor from './checkbox-prop-editor'
import NumberPropEditor from './number-prop-editor'
import TextareaPropEditor from './textarea-prop-editor'
import DatePropEditor from './date-prop-editor'

const editors = {
  'text-prop-editor': TextPropEditor,
  'checkbox-prop-editor': CheckboxPropEditor,
  'number-prop-editor': NumberPropEditor,
  'textarea-prop-editor': TextareaPropEditor,
  'date-prop-editor': DatePropEditor,
}

for (const editorName of Object.keys(editors)) {
  Vue.component(editorName, editors[editorName])
}

export {
  TextPropEditor,
  CheckboxPropEditor,
  NumberPropEditor,
  TextareaPropEditor,
  DatePropEditor,
  editors,
}
