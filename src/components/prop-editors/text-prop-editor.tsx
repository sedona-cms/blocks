import Vue, { VNode, PropType } from 'vue'

export default Vue.extend({
  name: 'TextPropEditor',
  functional: true,
  props: {
    value: {
      type: String as PropType<string>,
      default: '',
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  render(_h, { props, listeners }): VNode {
    return (
      <q-input
        outlined={true}
        dark={true}
        value={props.value}
        label={props.title}
        on-input={listeners['change']}
      />
    )
  },
})
