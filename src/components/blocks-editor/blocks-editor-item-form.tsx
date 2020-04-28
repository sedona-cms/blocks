import Vue, { VNode, PropType, CreateElement } from 'vue'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { editors } from '../prop-editors'

const getPropEditor = (componentPath: string): any => ({
  component: import(`~/admin/props/${componentPath}`),
  timeout: 600,
})

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
  data() {
    return {
      customPropEditors: {} as { [key: string]: Function },
    }
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
  created(): void {
    const propEditors: string[] = Object.keys(this.meta.props).map(
      propName => this.meta.props[propName].editor ?? ''
    )
    const customEditors: string[] = propEditors.filter(item => {
      const editorName = `${item}-prop-editor`
      return !Object.keys(editors).includes(editorName)
    })

    for (const editor of customEditors) {
      this.customPropEditors[editor] = () => getPropEditor(editor)
    }
  },
  methods: {
    changeForm(propName: string, value: any): void {
      this.$emit('change', { propName, value })
    },
  },
  render(h: CreateElement): VNode {
    if (Object.keys(this.meta.props).length === 0) {
      return (
        <q-card class="bg-grey-9 q-pa-md text-grey" flat={true}>
          No field
        </q-card>
      )
    }

    const items: VNode[] = []
    for (const propName of Object.keys(this.meta.props)) {
      if (this.meta.props?.[propName].editor === undefined) continue

      const editorName = this.meta.props?.[propName]?.editor || 'text'
      let propEditor: string | Function = `${editorName}-prop-editor`
      if (!Object.keys(editors).includes(propEditor)) {
        propEditor = this.customPropEditors?.[editorName] || undefined
      }
      items.push(
        h(propEditor, {
          props: {
            value: this.form?.[propName],
            title: this.meta.props[propName].title,
          },
          on: {
            change: value => this.changeForm(propName, value),
          },
        })
      )
    }

    return (
      <q-card class="bg-grey-9 q-pa-md" flat={true}>
        <div class="q-gutter-md">{...items}</div>
      </q-card>
    )
  },
})
