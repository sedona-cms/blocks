<template>
  <div>
    Teaser block
    <br />
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
