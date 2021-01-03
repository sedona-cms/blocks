import Vue, { VNode, PropType } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
import BlocksEditorItemForm from './blocks-editor-item-form'
import { BlockData } from '../../types'

export default Vue.extend({
  name: 'BlocksEditorItem',
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    component: {
      type: String as PropType<string>,
      required: true,
    },
    form: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        {}
      },
    },
  },
  components: {
    BlocksEditorItemForm,
  },
  data() {
    return {
      showRemoveConfirm: false as boolean,
      isFormLoad: false as boolean,
    }
  },
  computed: {
    meta(): BlockMeta {
      const result = this.$blocks.getBlock(this.component)
      if (result === undefined) {
        throw new Error(`Block meta for component ${this.component} not found.`)
      }
      return result
    },
  },
  created(): void {
    this.$root.$on('blocks:expand-all', this.expandItem)
    this.$root.$on('blocks:collapse-all', this.collapseItem)
  },
  beforeDestroy(): void {
    this.$root.$off('blocks:expand-all', this.expandItem)
    this.$root.$off('blocks:collapse-all', this.collapseItem)
  },
  mounted() {
    eventBus.on('blocks:add-block', args => {
      const block = args[0] as BlockData
      if (block.id === this.id) {
        // @ts-ignore refs
        this.$refs.blockItem.show()
      }
    })
  },
  methods: {
    removeCancelClick(event: Event): void {
      event.stopPropagation()
      this.showRemoveConfirm = false
    },
    removeOkClick(event: Event): void {
      event.stopPropagation()
      this.$emit('remove', { id: this.id })
    },
    removeClick(): void {
      this.showRemoveConfirm = true
    },
    clone(): void {
      this.$emit('clone', { id: this.id })
    },
    change({ propName, value }: { propName: string; value: unknown }): void {
      this.$emit('change', { propName, value })
    },
    expandItem(): void {
      if (this.$refs['blockItem'] !== undefined) {
        // @ts-ignore @ToDo $refs fix
        this.$refs['blockItem'].show()
      }
    },
    collapseItem(): void {
      if (this.$refs['blockItem'] !== undefined) {
        // @ts-ignore @ToDo $refs fix
        this.$refs['blockItem'].hide()
      }
    },
  },
  render(): VNode {
    /// Block item confirm

    const removeConfirm = (
      <div class={['fit', 'row', 'q-gutter-x-sm', 'justify-center']}>
        <q-btn label="Cancel" dense={false} outline={true} on-click={this.removeCancelClick} />
        <q-btn label="Remove" dense={false} color="negative" on-click={this.removeOkClick} />
      </div>
    )

    /// Block item

    const headerItemIcon = (
      <q-item-section avatar={true}>
        <q-avatar icon={this.meta?.icon || 'extension'} textColor="white" />
      </q-item-section>
    )

    // Block item title with sub title

    const headerItemTitle = (
      <q-item-section>
        <q-item-label>{this.meta?.title || this.component}</q-item-label>
        {this.meta.description ? (
          <q-item-label caption={true} lines={2}>
            {this.meta.description}
          </q-item-label>
        ) : undefined}
      </q-item-section>
    )

    // Block item context menu

    const headerItemMenu = (
      <q-item-section side={true}>
        <q-btn
          round={true}
          flat={true}
          dense={true}
          icon="more_vert"
          on-click={event => event.stopPropagation()}>
          <q-menu auto-close={true}>
            <q-list bordered={false}>
              <q-item clickable={true} on-click={this.clone}>
                <q-item-section>Clone</q-item-section>
              </q-item>
              <q-item clickable={true} on-click={this.removeClick}>
                <q-item-section>
                  <q-item-label lines={1}>Remove Block</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
    )

    let form: VNode | undefined
    if (this.isFormLoad) {
      form = (
        <blocks-editor-item-form
          component={this.component}
          form={this.form}
          on-change={this.change}
        />
      )
    }

    return (
      <q-expansion-item
        ref="blockItem"
        icon={this.meta.icon}
        class={['admin-block-item', 'bg-grey-8', 'text-white']}
        denseToggle={false}
        defaultOpened={false}
        scopedSlots={{
          header: () => [
            ...(this.showRemoveConfirm
              ? [removeConfirm]
              : [headerItemIcon, headerItemTitle, headerItemMenu]),
          ],
        }}
        on-before-show={() => (this.isFormLoad = true)}>
        {form}
      </q-expansion-item>
    )
  },
})
