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
    computed: {
      page() {
        return this.$store.getters.pageBySlug('index')
      },
    },
  }
</script>
