import Vue, { VNode, PropType, CreateElement } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { editors } from '../prop-editors'

export default Vue.extend({
  name: 'BlocksEditorItemForm',
  props: {
    component: {
      type: String as PropType<string>,
      required: true,
    },
    form: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {},
      validator(value: any): boolean {
        return typeof value === 'object'
      },
    },
  },
  computed: {
    meta(): BlockMeta {
      const result = this.$blocks.getBlock(this.component)
      if (result === undefined) {
        throw new Error(`Block meta not found for component ${this.component}`)
      }
      return result
    },
  },
  render(h: CreateElement): VNode {
    if (
      typeof this.form !== 'object' ||
      (typeof this.form === 'object' && Object.keys(this.form).length === 0)
    ) {
      return (
        <q-card class="bg-grey-9 q-pa-md text-grey" flat={true}>
          No field
        </q-card>
      )
    }

    const items: VNode[] = []
    for (const propName of Object.keys(this.form)) {
      const editorName = `${propName}-prop-editor`
      if (Object.keys(editors).includes(editorName)) {
        items.push(h(editorName))
      }
    }

    return (
      <q-card class="bg-grey-9" flat={true}>
        {[...items]}
      </q-card>
    )
  },
})
