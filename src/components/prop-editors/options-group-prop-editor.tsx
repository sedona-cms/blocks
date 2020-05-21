import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

export default mixins(propEditorMixin).extend({
  name: 'OptionsGroupPropEditor',
  render(): VNode {
    return <div>Options Group</div>
  },
})
