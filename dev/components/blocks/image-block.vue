<template>
  <div class="block">
    Image block
  </div>
</template>

<script>
  export default {
    name: 'ImageBlock',
  }
</script>

<style scoped>
  .block {
    border: 1px solid green;
    padding: 20px;
    margin-bottom: 15px;
  }
</style>

<block>
{
  "name": "Image",
  "description": "Image block",
  "group": "media",
  "icon": "image"
}
</block>
