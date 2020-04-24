import Vue, { VNode, PropType } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import BlocksEditorItemForm from './blocks-editor-item-form'

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
    props: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {},
    },
  },
  components: {
    BlocksEditorItemForm,
  },
  data() {
    return {
      showRemoveConfirm: false as boolean,
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
    cloneClick(): void {
      this.$emit('clone', { id: this.id })
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
              <q-item clickable={true} on-click={this.cloneClick}>
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

    return (
      <q-expansion-item
        icon={this.meta.icon}
        class={['admin-block-item', 'bg-grey-8', 'text-white']}
        denseToggle={false}
        defaultOpened={false}
        group="blocks"
        scopedSlots={{
          header: () => [
            ...(this.showRemoveConfirm
              ? [removeConfirm]
              : [headerItemIcon, headerItemTitle, headerItemMenu]),
          ],
        }}>
        <blocks-editor-item-form />
      </q-expansion-item>
    )
  },
})
