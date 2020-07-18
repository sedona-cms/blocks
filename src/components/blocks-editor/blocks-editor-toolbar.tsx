import Vue, { VNode, PropType } from 'vue'
import { palette } from '../blocks-palette'

export default Vue.extend({
  name: 'BlocksEditorToolbar',
  props: {
    canUndo: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    canRedo: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    blocksCount: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  methods: {
    undo(): void {
      this.$emit('undo')
    },
    redo(): void {
      this.$emit('redo')
    },
    expandAll(): void {
      this.$emit('expand-all')
    },
    collapseAll(): void {
      this.$emit('collapse-all')
    },
    togglePalette(): void {
      const isShowPalette = !palette.state.isOpen
      const eventName = isShowPalette ? 'show-palette' : 'hide-palette'

      this.$emit(eventName)
    },
  },
  render(): VNode {
    return (
      <q-toolbar>
        <q-btn
          icon="undo"
          round={true}
          dense={true}
          flat={true}
          disable={!this.canUndo}
          on-click={this.undo}>
          <q-tooltip>Undo</q-tooltip>
        </q-btn>
        <q-btn
          icon="redo"
          round={true}
          dense={true}
          flat={true}
          disable={!this.canRedo}
          on-click={this.redo}>
          <q-tooltip>Redo</q-tooltip>
        </q-btn>
        <q-separator dark={true} inset={true} spaced={true} vertical={true} />
        <q-btn
          icon="unfold_more"
          round={true}
          dense={true}
          flat={true}
          disable={this.blocksCount === 0}
          on-click={this.expandAll}>
          <q-tooltip>Expand all</q-tooltip>
        </q-btn>
        <q-btn
          icon="unfold_less"
          round={true}
          dense={true}
          flat={true}
          disable={this.blocksCount === 0}
          on-click={this.collapseAll}>
          <q-tooltip>Collapse all</q-tooltip>
        </q-btn>
        <q-separator color="grey-9" />
        <q-btn
          icon={palette.state.isOpen ? 'close' : 'add'}
          color={palette.state.isOpen ? 'negative' : 'primary'}
          round={true}
          dense={true}
          size="md"
          className="q-ml-sm"
          on-click={this.togglePalette}
        />
      </q-toolbar>
    )
  },
})
