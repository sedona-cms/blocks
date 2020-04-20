import Vue, { VNode } from 'vue'
import upperFirst from 'lodash/upperFirst'
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
    blocks(): { [key: string]: BlockMeta[] } {
      if (this.search === '') return this.$blocks.groupedMeta

      const result: { [key: string]: BlockMeta[] } = {}
      const search = this.search.toLowerCase()

      for (const groupName of Object.keys(this.$blocks.groupedMeta)) {
        const blocks = this.$blocks.groupedMeta[groupName].filter(blockMeta => {
          const name = (blockMeta?.name || '').toLowerCase()
          const description = (blockMeta?.description || '').toLowerCase()
          return name.includes(search) || description.includes(search)
        })
        if (blocks.length > 0) {
          result[groupName] = blocks
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
    for (const groupName of Object.keys(this.blocks)) {
      items.push(<q-item-label header={true}>{upperFirst(groupName)}</q-item-label>)
      items.push(
        ...this.blocks[groupName].map(blockMeta => {
          return (
            <blocks-palette-item
              name={blockMeta.name}
              title={blockMeta.title}
              description={blockMeta.description}
              icon={blockMeta.icon}
              on-click={blockName => console.log(blockName)}
            />
          )
        })
      )
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
