<template>
  <div class="block" :style="{ color: variant }">
    <h2>TeaserBlock</h2>
    <p :style="{ fontSize: `${fontSize}px` }"><strong>Caption:</strong> {{ caption }}</p>
    <br />
    <strong>Variant:</strong> {{ variant }}
  </div>
</template>

<script>
  export default {
    name: 'TeaserBlock',
    props: {
      caption: {
        type: String,
        default: '',
      },
      variant: {
        type: String,
        default: 'black',
      },
      fontSize: {
        type: Number,
        default: 12,
      },
    },
  }
</script>

<style scoped>
  .block {
    border: 1px solid blue;
    padding: 20px;
    margin-bottom: 15px;
  }
</style>

<block>
{
  "name": "Teaser block",
  "description": "Teaser block",
  "icon": "image",
  "props": {
    "caption": {
      "default": "default text"
    },
    "variant": {
      "title": "Variants",
      "default": "red",
      "options": {
        "variants": [
          "red",
          "blue",
          { "label": "Green variant", "value": "green" }
        ]
      }
    }
  }
}
</block>
