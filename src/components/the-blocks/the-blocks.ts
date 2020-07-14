import Vue, { VNode, PropType, CreateElement } from 'vue'
import { BlockData } from '@/types'

export default Vue.extend({
  name: 'TheBlocks',
  functional: true,
  props: {
    blocks: {
      type: Array as PropType<BlockData[]>,
      required: true,
    },
    tag: {
      type: String as PropType<string>,
      default: 'div',
    },
  },
  render(h: CreateElement, { props }): VNode {
    const components = new Set<VNode>()
    for (const block of props.blocks) {
      const component = h(block.component, { props: { ...block.props }, key: block.id })
      components.add(component)
    }

    return h(props.tag, [...components])
  },
})
