<template>
  <div>
    <template v-if="page">
      <the-blocks :blocks="page.content" />
    </template>
  </div>
</template>

<script>
  import { TheBlocks } from '@sedona-cms/blocks/lib/components'
  import page from '~/assets/data/index.json'

  export default {
    name: 'IndexPage',
    components: {
      TheBlocks,
    },
    computed: {
      page() {
        return this.$store.getters.pageBySlug('index')
      },
    },
    created() {
      this.$store.commit('SET_PAGE', { slug: 'index', page })
    },
  }
</script>
