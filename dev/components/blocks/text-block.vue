<template>
  <div>Text block says: {{ text }}</div>
</template>

<script>
  export default {
    name: 'TextBlock',
    props: {
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>

<block>
{
  "name": "Text",
  "description": "Block for rendering text",
  "props": {
    "text": {
      "type": "text"
    },
    "isDark": {
      "type": "checkbox"
    }
  }
}
</block>
