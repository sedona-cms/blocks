import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BlocksEditorSavePanel',
  functional: true,
  props: {},
  render(_h, { listeners }): VNode {
    return (
      <div
        class="fixed-bottom full-width bg-grey-7 q-pa-md"
        style="max-width: 300px; min-height: 100px">
        <q-btn
          color="primary"
          size="lg"
          label="Save"
          class="full-width"
          on-click={listeners.save}
        />
      </div>
    )
  },
})
