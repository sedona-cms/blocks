import { PropType, VNode } from 'vue'
import mixins from 'vue-typed-mixins'
import { propEditorMixin } from '../mixins/prop-editor-mixin'
import YoutubePropEditorForm from './youtube-prop-editor-form'

export default mixins(propEditorMixin).extend({
  name: 'YoutubePropEditor',
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    asd() {
      // @ts-ignore
      this.$sedona.modal(YoutubePropEditorForm, {
        title: 'Youtube Video',
      })
    },
  },
  render(): VNode {
    return (
      <div>
        <q-btn label="Select Video" outline={true} class="full-width" on-click={this.asd} />
      </div>
    )
  },
})
