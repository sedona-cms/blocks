import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from './mixins/prop-editor-mixin'

export default mixins(propEditorMixin).extend({
  name: 'DatePropEditor',
  props: {
    value: {
      type: Date as PropType<Date>,
      required: true,
    },
  },
  render(): VNode {
    return (
      <div class="text-white">
        {this.title}
        <q-date
          value={this.value}
          minimal={true}
          dark={true}
          on-input={value => this.$emit('change', value)}
        />
      </div>
    )
  },
})
