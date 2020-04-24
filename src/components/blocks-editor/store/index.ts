import Vue from 'vue'
import Vuex from 'vuex'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { BlockData } from '../../../types'

Vue.use(Vuex)

export interface RootState {
  items: BlockData[]
}

export const store = new Vuex.Store<RootState>({
  state: {
    items: [],
  },
  mutations: {
    load(state, { blocks }: { blocks: BlockData[] }): void {
      state.items = blocks
    },
    add(state, { block }: { block: BlockData }): void {
      state.items.push(block)
    },
    clone(state, { id }: { id: string }): void {
      const block = state.items.find(item => item.id === id)
      if (block === undefined) {
        throw new Error(`Block with id ${id} not found.`)
      }
      state.items.push({
        id: generateId(),
        component: block.component,
        props: block.props,
      })
    },
    remove(state, { id }: { id: string }): void {
      const index = state.items.findIndex(item => item.id === id)
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
  },
})
