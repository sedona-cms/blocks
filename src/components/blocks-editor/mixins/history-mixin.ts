import Vue from 'vue'
import { MutationPayload } from '../../../types'

export const historyMixin = Vue.extend({
  data() {
    return {
      done: [] as MutationPayload[],
      undone: [] as MutationPayload[],
      newMutation: true as boolean,
    }
  },
  computed: {
    canRedo(): boolean {
      return this.undone.length > 0
    },
    canUndo(): boolean {
      return this.done.length > 0
    },
  },
  methods: {
    addToHistory(mutation: MutationPayload): void {
      if (mutation.type === 'admin/blocks/clear') return

      this.done.push(mutation)

      if (this.newMutation) {
        this.undone = []
      }
    },
    redo(): void {
      let commit = this.undone.pop()
      if (commit === undefined) return

      this.newMutation = false
      switch (typeof commit.payload) {
        case 'object':
          this.$store.commit(`${commit.type}`, Object.assign({}, commit.payload))
          break
        default:
          this.$store.commit(`${commit.type}`, commit.payload)
      }
      this.newMutation = true
    },
    undo(): void {
      const lastMutation = this.done.pop()
      if (lastMutation === undefined) return

      this.undone.push(lastMutation)
      this.newMutation = false
      this.$store.commit('admin/blocks/clear')

      for (const mutation of this.done) {
        switch (typeof mutation.payload) {
          case 'object':
            this.$store.commit(`${mutation.type}`, Object.assign({}, mutation.payload))
            break
          default:
            this.$store.commit(`${mutation.type}`, mutation.payload)
        }
        this.done.pop()
      }
    },
  },
})
