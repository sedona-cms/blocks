import Vue, { VNode, PropType } from 'vue'

type Block = {
  id: string
  component: string
  props: any
}

export default Vue.extend({
  name: 'TheBlocks',
  functional: true,
  props: {
    blocks: {
      type: Array as PropType<Block[]>,
      default: () => [],
    },
    tag: {
      type: String as PropType<string>,
      default: 'div',
    },
  },
  render(h, { props }): VNode {
    const components = new Set<VNode>()
    for (const block of props.blocks) {
      const component = h(block.component, { props: { id: block.id, ...block.props } })
      components.add(component)
    }
    return h(props.tag, [...components])
  },
})
