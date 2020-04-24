import Vue, { VNode, PropType } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'

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
  render(): VNode {
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
      console.log(propName)
    }

    return (
      <q-card class="bg-grey-9" flat={true}>
        Form
      </q-card>
    )
  },
})
