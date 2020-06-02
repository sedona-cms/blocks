import './../prop-editors'
import { VNode, PropType } from 'vue'
import Draggable from 'vuedraggable'
import mixins from 'vue-typed-mixins'
import cloneDeep from 'lodash/cloneDeep'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlocksPalette } from '../blocks-palette'
import { BlockData, MutationPayload } from '../../types'
import BlocksEditorItem from './blocks-editor-item'
import BlocksEditorToolbar from './blocks-editor-toolbar'
import { adminModule } from './store'
import { historyMixin } from './mixins/history-mixin'

import './blocks-editor.css'

export default mixins(historyMixin).extend({
  name: 'BlocksEditor',
  props: {
    blocks: {
      type: Array as PropType<BlockData[]>,
      required: true,
    },
  },
  components: {
    Draggable,
    BlocksPalette,
    BlocksEditorItem,
    BlocksEditorToolbar,
  },
  data() {
    return {
      isPaletteOpen: false as boolean,
      unsubscribe: undefined as Function | undefined,
      unwatch: undefined as Function | undefined,
      items: [] as BlockData[],
      drag: false as boolean,
    }
  },
  created(): void {
    if (!this.$store.hasModule('admin/blocks')) {
      this.$store.registerModule('admin/blocks', adminModule, { preserveState: false })
    }

    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload, state) => {
      if (!mutation.type.startsWith('admin/blocks')) {
        return
      }
      const event = mutation.type.replace('admin/blocks/', '')

      this.$emit(event, mutation.payload)

      if (event !== 'load') {
        this.$emit('change', state['admin/blocks'].items)
      }

      this.addToHistory(mutation)

      eventBus.emit('core:save-disable', mutation.type === 'admin/blocks/load')
    })

    this.$store.commit('admin/blocks/load', { blocks: this.blocks, meta: this.$blocks.meta })
    this.items = cloneDeep(this.$store.state['admin/blocks'].items as BlockData[])

    this.unwatch = this.$store.watch(
      state => state['admin/blocks'].items,
      items => (this.items = items),
      { deep: true }
    )
  },
  beforeDestroy(): void {
    // @ts-ignore
    if (module?.hot?.active === false) {
      return
    }
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe()
    }
    if (typeof this.unwatch === 'function') {
      this.unwatch()
    }
    this.$store.unregisterModule('admin/blocks')
  },
  methods: {
    addBlock(blockMeta: BlockMeta): void {
      if (blockMeta.name === undefined) {
        throw new TypeError('Component name not provided')
      }

      const props = {}
      for (const propMetaName of Object.keys(blockMeta.props)) {
        props[propMetaName] = blockMeta.props[propMetaName].default
      }

      const block: BlockData = {
        id: generateId(),
        component: blockMeta.name,
        props,
      }

      this.$store.commit('admin/blocks/add', { block })
    },
    cloneBlock(id: string): void {
      this.$store.commit('admin/blocks/clone', { id })
    },
    changeBlockProp(id: string, propName: string, value: any): void {
      this.$store.commit('admin/blocks/changeProp', { id, propName, value })
    },
    removeBlock({ id }: { id: string }): void {
      this.$store.commit('admin/blocks/remove', { id })
    },
    reorder(items: BlockData[]): void {
      this.items = items
      const ids: string[] = []
      for (const item of this.items) {
        ids.push(item.id)
      }
      this.$store.commit('admin/blocks/reorder', { ids })
    },
    expandAll(): void {
      this.$root.$emit('blocks:expand-all')
    },
    collapseAll(): void {
      this.$root.$emit('blocks:collapse-all')
    },
  },
  render(): VNode {
    const items: VNode[] = []
    for (const blockData of this.items) {
      if (!this.$blocks.existsBlock(blockData.component)) {
        console.warn(`Block with name ${blockData.component} not exists in project`)
        continue
      }
      items.push(
        <blocks-editor-item
          key={blockData.id}
          id={blockData.id}
          component={blockData.component}
          form={blockData.props || {}}
          on-change={({ propName, value }) => this.changeBlockProp(blockData.id, propName, value)}
          on-clone={({ id }) => this.cloneBlock(id)}
          on-remove={this.removeBlock}
        />
      )
    }

    return (
      <div class="fit relative-position">
        <blocks-editor-toolbar
          can-undo={this.canUndo}
          can-redo={this.canRedo}
          blocks-count={this.blocks.length}
          on-undo={this.undo}
          on-redo={this.redo}
          on-expand-all={this.expandAll}
          on-collapse-all={this.collapseAll}
          on-show-palette={() => (this.$refs['palette'] as any).show()}
          on-hide-palette={() => (this.$refs['palette'] as any).hide()}
        />
        <blocks-palette ref="palette" on-add-block={({ block }) => this.addBlock(block)} />
        <q-list dark={true} style="padding-bottom:120px">
          <draggable
            value={this.items}
            animation={200}
            group="description"
            disabled={false}
            on-start={() => (this.drag = true)}
            on-end={() => (this.drag = false)}
            on-input={this.reorder}>
            <transition-group type="transition" name={!this.drag ? 'flip-list' : null}>
              {...items}
            </transition-group>
          </draggable>
        </q-list>
      </div>
    )
  },
})
