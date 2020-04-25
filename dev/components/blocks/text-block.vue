<template>
  <div class="block">
    <h2>TextBlock</h2>
    Text block says: {{ text }}
  </div>
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

<style scoped>
  .block {
    border: 1px solid red;
    padding: 20px;
    margin-bottom: 15px;
  }
</style>

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
