import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BlocksPalette',
  data() {
    return {
      search: '' as string,
    }
  },
  render(): VNode {
    return <div>BlocksPalette</div>
  },
})
