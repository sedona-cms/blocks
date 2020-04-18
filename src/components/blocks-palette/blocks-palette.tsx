import Vue, { VNode } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import BlocksPaletteSearch from './blocks-palette-search'
import BlocksPaletteItem from './blocks-palette-item'

export default Vue.extend({
  name: 'BlocksPalette',
  components: {
    BlocksPaletteSearch,
    BlocksPaletteItem,
  },
  data() {
    return {
      search: '' as string,
    }
  },
  computed: {
    blocks(): Map<string, BlockMeta> {
      if (this.search === '') return this.$blocks.groupedMeta
      const result: Map<string, BlockMeta> = new Map<string, BlockMeta>()
      const search = this.search.toLowerCase()
      for (const blockMeta of this.$blocks.groupedMeta.values()) {
        const name = (blockMeta?.name || '').toLowerCase()
        const description = (blockMeta?.description || '').toLowerCase()
        if (name.includes(search) || description.includes(search)) {
          result.set(blockMeta.group || 'general', blockMeta)
        }
      }
      return result
    },
  },
  methods: {
    hide(): void {
      console.log('hide')
    },
  },
  render(): VNode {
    const items: VNode[] = []
    for (const [index, value] of this.blocks) {
      console.log(index, value)
      items.push()
    }

    return (
      <div>
        <q-toolbar class="bg-grey-7">
          <q-toolbar-title>Select block</q-toolbar-title>
          <q-btn flat={true} round={true} dense={true} on-click={this.hide}>
            <q-icon name="arrow_back" />
          </q-btn>
        </q-toolbar>
        <blocks-palette-search
          ref="searchInput"
          on-change={(value: string) => {
            this.search = value
          }}
        />
        <q-list>{items}</q-list>
      </div>
    )
  },
})
