import Vue, { VNode, PropType } from 'vue'

type editorStatus = 'new' | 'ready' | 'changed' | 'saved'

export default Vue.extend({
  name: 'BlocksEditorSavePanel',
  functional: true,
  props: {
    status: {
      type: String as PropType<editorStatus>,
      required: true,
    },
  },
  render(_h, { listeners, props }): VNode {
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
        <p class="text-grey-4 no-margin q-pa-sm" style="padding-left:0">
          Status: {props.status}
        </p>
      </div>
    )
  },
})
