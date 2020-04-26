import Vue, { PropType } from 'vue'

export const propEditorMixin = Vue.extend({
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
})
