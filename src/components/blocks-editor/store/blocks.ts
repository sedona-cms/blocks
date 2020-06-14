import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlockData } from '../../../types'

export const state = Vue.observable({
  items: [] as BlockData[],
})

export const mutations = {
  load: (blocks: BlockData[], meta: BlockMeta[]) => {
    const result: BlockData[] = cloneDeep(blocks)
    for (const block of result) {
      const blockMeta = meta.find(item => item.name === block.component)
      if (blockMeta === undefined) {
        result.splice(result.indexOf(block), 1)
        console.warn(`Meta info for block ${block.component} not found.`)
        continue
      }
    }

    state.items = result
  },
  addBlock: (value: BlockData) => state.items.push(value),
  clone: (id: string) => {
    const block = state.items.find(item => item.id === id)
    if (block === undefined) {
      throw new Error(`Block with id ${id} not found.`)
    }
    state.items.push({
      id: generateId(),
      component: block.component,
      props: cloneDeep(block.props),
    })
  },
  clear: () => (state.items = []),
  remove: (id: string) => {
    const index = state.items.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error(`No block with id ${id}`)
    }
    state.items.splice(index, 1)
  },
  reorder: (ids: string[]) => {
    state.items.sort((a: BlockData, b: BlockData) => {
      const aOrder = ids.findIndex(item => item === a.id)
      const bOrder = ids.findIndex(item => item === b.id)
      if (aOrder < bOrder) {
        return -1
      }
      if (bOrder < aOrder) {
        return 1
      }
      return 0
    })
  },
  changeProp: (id: string, propName: string, value: any) => {
    const index = state.items.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error(`No block with id ${id}`)
    }
    if (typeof state.items[index].props === 'object') {
      // @ts-ignore
      state.items[index].props[propName] = value
    } else {
      state.items[index].props = {
        [propName]: value,
      }
    }
  },
}
