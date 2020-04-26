import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

export default mixins(propEditorMixin).extend({
  name: 'CheckboxPropEditor',
  props: {
    value: {
      type: [Boolean, String] as PropType<boolean | string>,
      required: true,
    },
  },
  render(): VNode {
    return (
      <q-checkbox
        value={this.value}
        label={this.title}
        dark={true}
        on-input={(value: boolean) => this.$emit('change', value)}
      />
    )
  },
})
