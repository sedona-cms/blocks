import Vue, { VNode } from 'vue'
import upperFirst from 'lodash/upperFirst'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import BlocksPaletteSearch from './blocks-palette-search'
import BlocksPaletteItem from './blocks-palette-item'
import { palette } from './store/palette'

import './blocks-palette.css'

type Method = () => void

let hideTimer: number
let hoverWotcherHandler: Method

export default Vue.extend({
  name: 'BlocksPalette',
  components: {
    BlocksPaletteSearch,
    BlocksPaletteItem,
  },
  data() {
    return {
      search: '' as string,
      // eslint-disable-next-line unicorn/no-null
      toggleButton: null as HTMLElement | null,
      hovered: false as boolean,
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
  mounted(): void {
    this.toggleButton = document.querySelector('.toggle-button')

    this.$el.addEventListener('mouseenter', this.__mouseover)
    this.$el.addEventListener('mouseleave', this.__mouseout)
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseenter', this.__mouseover)
    this.$el.removeEventListener('mouseleave', this.__mouseout)
  },
  methods: {
    show(): void {
      this.$el.setAttribute('style', 'left: 300px;')
      if (this.toggleButton !== null) {
        this.toggleButton.style.display = 'none'
      }
      palette.mutations.setOpen(true)

      ;(this.$refs.searchInput as HTMLFormElement).focus()

      hoverWotcherHandler = this.$watch(() => this.hovered, this.__hoverWatcher, {
        immediate: true,
      })
    },
    hide(): void {
      (this.$refs.searchInput as HTMLFormElement).clear()
      this.$el.setAttribute('style', 'left: -300px;')
      if (this.toggleButton !== null) {
        this.toggleButton.style.display = 'initial'
      }
      palette.mutations.setOpen(false)

      if (typeof hoverWotcherHandler === 'function') {
        hoverWotcherHandler()
      }
    },
    __hoverWatcher(): void {
      if (this.hovered) {
        clearTimeout(hideTimer)
        return
      }
      // @ts-ignore typescript bug
      hideTimer = setTimeout(this.hide, 2000)
    },
    __mouseover(): void {
      this.hovered = true
    },
    __mouseout(): void {
      this.hovered = false
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
              on-click={() => this.$emit('add-block', { block: blockMeta })}
            />
          )
        })
      )
    }

    return (
      <div class="blocks-palette bg-grey-9 shadow-5">
        <q-toolbar class="bg-grey-7">
          <q-toolbar-title>Select block</q-toolbar-title>
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
