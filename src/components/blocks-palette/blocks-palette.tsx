import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BlocksPalette',
  data() {
    return {
      search: '' as string,
    }
  },
  render(): VNode {
    // @ts-ignore
    console.log(this.$blocks)
    return <div>BlocksPalette</div>
  },
})
