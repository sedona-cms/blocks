import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

export default mixins(propEditorMixin).extend({
  name: 'NumberPropEditor',
  props: {
    value: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
  },
  render(): VNode {
    return (
      <q-input
        outlined={true}
        dark={true}
        type="number"
        value={Number(this.value)}
        label={this.title}
        on-input={(value: string) => this.$emit('change', Number(value))}
      />
    )
  },
})
