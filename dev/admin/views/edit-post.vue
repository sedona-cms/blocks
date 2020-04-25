<template>
  <div>
    <blocks-editor v-if="page" :blocks="page.content" @change="updatePage" />
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
    methods: {
      updatePage(blocks) {
        this.$store.commit('SET_PAGE_CONTENT', { slug: 'index', blocks })
      },
    },
  }
</script>
