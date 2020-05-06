<template>
  <div>
    Video
  </div>
</template>

<script>
  export default {
    name: 'YoutubeVideo',
    props: {
      url: {
        type: String,
      },
    },
  }
</script>

<block>
    {
        "group": "media",
        "icon": "play_circle_outline",
        "props": {
            "url": {
                "editor": "youtube"
            }
        }
    }
</block>
