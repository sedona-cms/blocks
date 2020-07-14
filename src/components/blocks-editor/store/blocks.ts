import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'
import { BlockData } from '../../../types'
import { history } from './history'

const state = Vue.observable({
  items: [] as BlockData[],
})

const mutations = {
  load(blocks: BlockData[], meta: readonly BlockMeta[]): void {
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
          if (blockMeta.props[propMeta].type === 'date') {
            block.props[propMeta] = new Date(blockMeta.props[propMeta].default)
            continue
          }
          block.props[propMeta] = blockMeta.props[propMeta].default
        }
      }
      // check for exists each prop in block data
      else {
        for (const propMeta of Object.keys(blockMeta.props)) {
          if (!Object.keys(block.props).includes(propMeta)) {
            if (blockMeta.props[propMeta].type === 'date') {
              block.props[propMeta] = new Date(blockMeta.props[propMeta].default)
              continue
            }
            block.props[propMeta] = blockMeta.props[propMeta].default
          }
        }
      }
    }
    state.items = result
  },
  clear(): void {
    state.items = []
  },
  add: (block: BlockData): void => {
    state.items.push(block)
  },
  changeProp(id: string, propName: string, value: unknown): void {
    const index = state.items.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error(`Block with id ${id} not found`)
    }
    if (typeof state.items[index].props !== 'object') {
      state.items[index].props = {
        [propName]: value,
      }
    } else {
      // @ts-ignore: https://github.com/microsoft/TypeScript/issues/29642
      state.items[index].props[propName] = value
    }
  },
  clone(id: string): void {
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
  remove(id: string): void {
    const index = state.items.findIndex(item => item.id === id)
    if (index > -1) {
      state.items.splice(index, 1)
    }
  },
  reorder(ids: string[]): void {
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
}

// eslint-disable-next-line @typescript-eslint/ban-types
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never

function mutate<K extends keyof typeof mutations, A extends ArgumentTypes<typeof mutations[K]>>(
  key: K,
  ...args: A
): void {
  // @ts-ignore call mutation function
  mutations[key](...args)

  if (key !== 'clear') {
    history.add(key, args)
  }
}

export const blocks = { state, mutations, mutate }
