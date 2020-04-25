<template>
  <div class="block">
    <h2>TeaserBlock</h2>
    <strong>Caption:</strong> {{ caption }}
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
        default: 'red',
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
      "type": "text",
      "default": "default text"
    },
    "variant": {
      "type": "radio-group",
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
