<template>
  <div>
    <blocks-editor />
  </div>
</template>

<script>
  import { BlocksEditor } from '@sedona-cms/blocks/lib/components'

  export default {
    name: 'EditPost',
    components: {
      BlocksEditor,
    },
  }
</script>
