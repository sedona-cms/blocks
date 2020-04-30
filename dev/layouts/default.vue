<template>
  <div>
    <the-header />

    <nuxt />
  </div>
</template>

<script>
  import TheHeader from '~/components/TheHeader'

  export default {
    name: 'LayoutDefault',
    components: { TheHeader },
  }
</script>
