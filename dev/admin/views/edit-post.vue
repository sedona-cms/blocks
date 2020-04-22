<template>
  <div>
    <blocks-editor v-if="page" :blocks="page.content" />
  </div>
</template>

<script>
  import { BlocksEditor } from '@sedona-cms/blocks/lib/components'

  export default {
    name: 'EditPost',
    components: {
      BlocksEditor,
    },
    data() {
      return {
        page: null,
      }
    },
    async mounted() {
      this.page = await this.$http.$get('data/index.json')
    },
  }
</script>
