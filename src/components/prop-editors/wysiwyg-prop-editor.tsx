import { PropType, VNode } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

const toolbar = [
  ['left', 'center', 'right', 'justify'],
  ['bold', 'italic', 'strike', 'underline'],
]

export default mixins(propEditorMixin).extend({
  name: 'WysiwygPropEditor',
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    toolbar: {
      type: Array as PropType<string[] | string[][]>,
      default: () => toolbar,
    },
  },
  render(): VNode {
    return (
      <q-editor
        outlined={true}
        dark={true}
        value={this.value}
        label={this.title}
        toolbar={this.toolbar}
        on-input={(value: string) => this.$emit('change', value)}
      />
    )
  },
})
