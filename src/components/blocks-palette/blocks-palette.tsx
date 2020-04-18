import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BlocksPalette',
  data() {
    return {
      search: '' as string,
    }
  },
  mounted(): void {},
  render(): VNode {
    // console.log(this.$)
    return <div>BlocksPalette</div>
  },
})
