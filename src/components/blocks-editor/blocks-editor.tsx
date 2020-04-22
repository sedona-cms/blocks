import Vue, { VNode, PropType } from 'vue'
import { BlocksPalette } from '../blocks-palette'
import { BlockData } from '../../types'

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

    return (
      <div>
        {toolbar}
        <blocks-palette ref="palette" />
        <q-list dark={true}>asd</q-list>
      </div>
    )
  },
})
