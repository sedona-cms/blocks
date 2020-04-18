import Vue, { VNode, PropType } from 'vue'
import startCase from 'lodash/startCase'

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

    const title = <q-item-label>{startCase(props.title)}</q-item-label>

    return (
      <q-item
        clickable={true}
        on-click={() => {
          // @ts-ignore
          listeners.click({ name: props.name })
        }}>
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
