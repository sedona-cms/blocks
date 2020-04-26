import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

export default mixins(propEditorMixin).extend({
  name: 'TextPropEditor',
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  render(): VNode {
    return (
      <q-input
        outlined={true}
        dark={true}
        value={this.value}
        label={this.title}
        on-input={(value: string) => this.$emit('change', value)}
      />
    )
  },
})
