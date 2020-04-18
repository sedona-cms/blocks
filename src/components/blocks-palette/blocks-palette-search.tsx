import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BlocksPaletteSearch',
  data() {
    return {
      search: '' as string,
    }
  },
  methods: {
    focus(): void {
      ;(this.$refs['input'] as HTMLInputElement).focus()
    },
    clear(): void {
      this.search = ''
      this.$emit('change', '')
    },
  },
  render(): VNode {
    let clearButton: VNode | undefined
    if (this.search !== '') {
      clearButton = (
        <q-icon
          name="close"
          class="cursor-pointer"
          on-click={() => {
            this.clear()
            this.focus()
          }}
        />
      )
    }

    return (
      <q-input
        ref="input"
        label="Search"
        filled={true}
        dark={true}
        value={this.search}
        scopedSlots={{
          append: () => [clearButton, <q-icon name="search" />],
        }}
        on-input={(value: string) => {
          this.search = value
          this.$emit('change', value.trim())
        }}
      />
    )
  },
})
