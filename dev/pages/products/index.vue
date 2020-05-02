<template>
  <div>
    <the-product-grid />
  </div>
</template>

<script>
  import TheProductGrid from '~/components/products/the-product-grid'

  export default {
    name: 'ProductsPage',
    components: {
      TheProductGrid,
    },
  }
</script>
