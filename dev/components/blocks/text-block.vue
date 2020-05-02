<template>
  <section
    :class="{ 'bg-gray-700': isDark, 'text-white': isDark, 'text-gray-700': !isDark }"
    class="body-font"
  >
    <div class="container px-5 py-24 mx-auto flex flex-col">
      <p v-html="content" class="leading-relaxed text-lg mb-4" />
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TextBlock',
    props: {
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
                "editor": "wysiwyg",
                "options": {
                    "toolbar": [["left", "center", "right"], ["bold", "italic", "strike"], ["fullscreen"]]
                }
            }
        }
    }
</block>
