<template>
  <div>
    <p :style="{ fontSize: `${fontSize}px` }">
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'TextBlock',
    props: {
      fontSize: {
        type: Number,
        default: 12,
      },
    },
  }
</script>

<style scoped></style>
