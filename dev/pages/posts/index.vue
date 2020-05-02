<template>
  <div>
    <the-post-grid />
  </div>
</template>

<script>
  import ThePostGrid from '~/components/posts/the-post-grid'

  export default {
    name: 'PostsPage',
    components: {
      ThePostGrid,
    },
  }
</script>
