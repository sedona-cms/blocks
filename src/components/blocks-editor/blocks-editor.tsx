import './../prop-editors'
import Vue, { VNode, PropType } from 'vue'
import Draggable from 'vuedraggable'
import cloneDeep from 'lodash/cloneDeep'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlocksPalette } from '../blocks-palette'
import { BlockData } from '../../types'
import BlocksEditorItem from './blocks-editor-item'
import BlocksEditorToolbar from './blocks-editor-toolbar'
import { blocks } from './store/blocks'
import { history } from './store/history'

import './blocks-editor.css'

type unwatchFunction = () => void

export default Vue.extend({
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
      unwatch: undefined as unwatchFunction | undefined,
      items: [] as BlockData[],
      drag: false as boolean,
    }
  },
  created(): void {
    history.clear()

    blocks.mutate('load', this.blocks, this.$blocks.meta)
    this.items = cloneDeep(blocks.state.items)

    this.unwatch = this.$watch(
      () => blocks.state.items,
      value => {
        const items = cloneDeep(value)
        this.items = items
        this.$emit('change', items)
        eventBus.emit('core:save-disable', false)
      },
      { deep: true }
    )

    eventBus.emit('core:save-disable', true)
  },
  beforeDestroy(): void {
    // @ts-ignore hotreloading fix
    if (module?.hot?.active === false) {
      return
    }
    if (typeof this.unwatch === 'function') {
      this.unwatch()
    }
  },
  methods: {
    async addBlock(blockMeta: BlockMeta): Promise<void> {
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
      blocks.mutate('add', block)

      await this.$nextTick()

      eventBus.emit('blocks:add-block', block)
    },
    cloneBlock(id: string): void {
      blocks.mutate('clone', id)
    },
    changeBlockProp(id: string, propName: string, value: unknown): void {
      blocks.mutate('changeProp', id, propName, value)
    },
    removeBlock({ id }: { id: string }): void {
      blocks.mutate('remove', id)
    },
    reorder(items: BlockData[]): void {
      this.items = items
      const ids: string[] = []
      for (const item of this.items) {
        ids.push(item.id)
      }
      blocks.mutate('reorder', ids)
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
          can-undo={history.canUndo()}
          can-redo={history.canRedo()}
          blocks-count={this.blocks.length}
          on-undo={history.undo}
          on-redo={history.redo}
          on-expand-all={this.expandAll}
          on-collapse-all={this.collapseAll}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          on-show-palette={() => (this.$refs['palette'] as any).show()}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <transition-group type="transition" name={!this.drag ? 'flip-list' : undefined}>
              {...items}
            </transition-group>
          </draggable>
        </q-list>
      </div>
    )
  },
})
