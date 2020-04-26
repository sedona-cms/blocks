<template>
  <div class="block" :class="{ dark: isDark }">
    <h2>TextBlock</h2>
    Text block says: {{ text }}
    <br />
    <p v-html="content" />
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
      content: {
        type: String,
        default: '',
      },
      isDark: {
        type: Boolean,
        default: false,
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

  .dark {
    background: #7f828b;
    color: #f5f5f5;
  }
</style>

<block>
{
  "name": "Text",
  "description": "Block for rendering text",
  "props": {
    "content": {
      "type": "textarea"
    }
  }
}
</block>
