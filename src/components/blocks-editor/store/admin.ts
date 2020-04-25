import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlockData } from '../../../types'

export const adminModule = {
  namespaced: true,
  state() {
    return {
      items: [],
    }
  },
  mutations: {
    load(state, { blocks, meta }: { blocks: BlockData[]; meta: BlockMeta[] }): void {
      const result = cloneDeep(blocks)
      for (const block of result) {
        const blockMeta = meta.find(item => item.name === block.component)
        if (blockMeta === undefined) {
          throw new Error(`Meta info for block ${block.component} not found.`)
        }
        // if props does not exists in block data
        if (typeof block.props !== 'object') {
          block.props = {}
          for (const propMeta of Object.keys(blockMeta.props)) {
            block.props[propMeta] = blockMeta.props[propMeta].default
          }
        }
        // check for exists each prop in block data
        else {
          for (const propMeta of Object.keys(blockMeta.props)) {
            if (!Object.keys(block.props).includes(propMeta)) {
              block.props[propMeta] = blockMeta.props[propMeta].default
            }
          }
        }
      }
      state.items = result
    },
    add(state, { block }: { block: BlockData }): void {
      Vue.set(state.items, state.items.length, block)
    },
    changeProp(state, { id, propName, value }: { id: string; propName: string; value: any }): void {
      const index = state.items.findIndex(item => item.id === id)
      if (index > -1) {
        if (typeof state.items[index].props !== 'object') {
          state.items[index].props = {
            [propName]: value,
          }
        } else {
          state.items[index].props[propName] = value
        }
      }
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
}
