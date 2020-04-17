import Vue from 'vue'
import { Context } from '@nuxt/types'
import { eventBus } from '@sedona-cms/core'

interface Asd {
  blocks: BlockMeta[]
}

const options: Asd = JSON.parse('<%= JSON.stringify(options) %>')

export default async function (context: Context, inject: Function): Promise<void> {
  eventBus.on('sedona:loaded', async () => {
    const { Blocks } = await import('./blocks')
    Vue.prototype.$blocks = new Blocks()
  })
}
