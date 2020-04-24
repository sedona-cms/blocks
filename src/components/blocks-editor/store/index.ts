import Vue from 'vue'
import Vuex from 'vuex'
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
    load(state, { blocks }: { blocks: BlockData[] }) {
      state.items = blocks
    },
    remove(state, { id }: { id: string }) {
      const index = state.items.findIndex(item => item.id === id)
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
  },
})
