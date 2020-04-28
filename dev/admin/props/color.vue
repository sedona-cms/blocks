<template>
  <q-field :label="title" outlined stack-label dark>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <select v-model="color" class="full-width">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </template>
  </q-field>
</template>

<script>
  import { propEditorMixin } from '@sedona-cms/blocks/lib/components'

  export default {
    name: 'Color',
    mixins: [propEditorMixin],
    props: {
      value: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        color: this.value,
      }
    },
    watch: {
      color(value) {
        this.$emit('change', value)
      },
    },
  }
</script>
