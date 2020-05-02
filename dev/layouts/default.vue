<template>
  <div>
    <the-header />

    <nuxt />

    <the-footer />
  </div>
</template>

<script>
  import TheHeader from '~/components/the-header'
  import TheFooter from '~/components/the-footer'

  export default {
    name: 'LayoutDefault',
    components: { TheHeader, TheFooter },
  }
</script>
