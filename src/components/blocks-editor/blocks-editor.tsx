import './../prop-editors'
import Vue, { VNode, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlocksPalette } from '../blocks-palette'
import { BlockData } from '../../types'
import BlocksEditorItem from './blocks-editor-item'
import { adminModule } from './store'

// store.subscribe((mutation, state) => {
//  console.log(mutation.type)
//  console.log(mutation.payload)
// })

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
  },
  data() {
    return {
      isPaletteOpen: false as boolean,
    }
  },
  created(): void {
    if (this.$store.hasModule('admin/blocks')) {
      return
    }
    this.$store.registerModule('admin/blocks', adminModule, { preserveState: false })
    this.$store.commit('admin/blocks/load', { blocks: this.blocks, meta: this.$blocks.meta })

    this.$store.subscribe((mutation, state) => {
      if (!mutation.type.startsWith('admin/blocks')) {
        return
      }
      const event = mutation.type.replace('admin/blocks/', '')

      this.$emit(event, mutation.payload)
      this.$emit('change', state['admin/blocks'].items)
    })
  },
  beforeDestroy(): void {
    this.$store.unregisterModule('admin/blocks')
  },
  methods: {
    addBlock(blockMeta: BlockMeta): void {
      if (blockMeta.name === undefined) {
        throw new TypeError('Component name not provided')
      }
      const block: BlockData = {
        id: generateId(),
        component: blockMeta.name,
        props: {},
      }
      for (const propMetaName of Object.keys(blockMeta.props)) {
        // @ts-ignore
        block.props[propMetaName] = blockMeta.props[propMetaName].default
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
  },
  render(): VNode {
    const toolbar = (
      <q-toolbar>
        <q-btn icon="undo" round={true} dense={true} flat={true}>
          <q-tooltip>Undo</q-tooltip>
        </q-btn>
        <q-btn icon="redo" round={true} dense={true} flat={true}>
          <q-tooltip>Redo</q-tooltip>
        </q-btn>
        <q-separator inset={true} spaced={true} vertical={true} />
        <q-separator />
        <q-btn
          icon="add"
          color="primary"
          round={true}
          dense={true}
          size="md"
          className="q-ml-sm"
          on-click={() => (this.$refs['palette'] as any).show()}
        />
      </q-toolbar>
    )

    const items = new Set<VNode>()
    for (const blockData of this.$store.state['admin/blocks'].items as BlockData[]) {
      if (!this.$blocks.existsBlock(blockData.component)) {
        console.warn(`Block with name ${blockData.component} not exists in project`)
        continue
      }
      items.add(
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
      <div>
        {toolbar}
        <blocks-palette ref="palette" on-add-block={({ block }) => this.addBlock(block)} />
        <q-list dark={true}>
          <draggable
            animation={200}
            group="description"
            disabled={false}
            on-end={item => console.log(item)}>
            <transition-group type="transition" name="flip-list">
              {[...items]}
            </transition-group>
          </draggable>
        </q-list>
      </div>
    )
  },
})
