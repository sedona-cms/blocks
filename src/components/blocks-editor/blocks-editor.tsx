import Vue, { VNode, PropType } from 'vue'
import { BlocksPalette } from '../blocks-palette'
import { BlockData } from '../../types'
import BlocksEditorItem from './blocks-editor-item'

export default Vue.extend({
  name: 'BlocksEditor',
  props: {
    blocks: {
      type: Array as PropType<BlockData[]>,
      required: true,
    },
  },
  components: {
    BlocksPalette,
    BlocksEditorItem,
  },
  data() {
    return {
      isPaletteOpen: false as boolean,
    }
  },
  render(): VNode {
    const addBlockButton = (
      <q-btn
        icon="add"
        color="primary"
        round={true}
        dense={true}
        size="md"
        class="q-ml-sm"
        on-click={() => (this.$refs['palette'] as any).show()}
      />
    )

    const toolbar = (
      <q-toolbar class="q-pa-sm">
        {addBlockButton}
        <q-space />
      </q-toolbar>
    )

    const items = new Set<VNode>()
    for (const blockData of this.blocks) {
      if (!this.$blocks.existsBlock(blockData.component)) {
        console.warn(`Block with name ${blockData.component} not exists in project`)
        continue
      }
      items.add(
        <blocks-editor-item
          id={blockData.id}
          component={blockData.component}
          props={blockData.props}
        />
      )
    }

    return (
      <div>
        {toolbar}
        <blocks-palette ref="palette" />
        <q-list dark={true}>{[...items]}</q-list>
      </div>
    )
  },
})
