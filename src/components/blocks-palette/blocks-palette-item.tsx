import Vue, { VNode, PropType } from 'vue'

export default Vue.extend({
  name: 'BlocksPaletteItem',
  functional: true,
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    description: {
      type: String as PropType<string>,
      default: '',
    },
    icon: {
      type: String as PropType<string>,
      default: 'extension',
    },
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
  render(_h, { props, listeners }): VNode {
    let subTitle: VNode | undefined
    if (props.description !== '') {
      subTitle = <q-item-label caption={true}>{props.description}</q-item-label>
    }

    const title = <q-item-label>{props.title}</q-item-label>

    return (
      <q-item style="user-select: none;" clickable={true} on-click={listeners.click}>
        <q-item-section avatar={true}>
          <q-avatar icon={props.icon} color="grey-7" text-color="white" />
        </q-item-section>
        <q-item-section>
          {title}
          {subTitle}
        </q-item-section>
      </q-item>
    )
  },
})
