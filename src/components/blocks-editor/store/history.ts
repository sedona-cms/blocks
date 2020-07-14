import Vue from 'vue'
import { blocks } from './blocks'

type MutationPayload = {
  type: string
  payload: unknown[]
}

const state = Vue.observable({
  done: [] as Array<MutationPayload>,
  undone: [] as Array<MutationPayload>,
})

const getters = {
  canRedo: () => state.undone.length > 0,
  canUndo: () => state.done.length > 1,
}

const mutations = {
  add(mutation: string, args: unknown[]): void {
    state.done.push({
      type: mutation,
      payload: args,
    })
  },
  clear(): void {
    state.done = []
    state.undone = []
  },
  undo(): void {
    const lastMutation = state.done.pop()
    if (lastMutation === undefined) return

    state.undone.push(lastMutation)

    blocks.mutations.clear()
    for (const mutation of state.done) {
      blocks.mutations[mutation.type](...mutation.payload)
    }
  },
  redo(): void {
    const lastMutation = state.undone.pop()
    if (lastMutation === undefined) return

    blocks.mutations[lastMutation.type](...lastMutation.payload)
  },
}

export const history = { ...state, ...mutations, ...getters }
