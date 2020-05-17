import Vue from 'vue'
import { Context } from '@nuxt/types'
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
import { BlockMeta } from '@sedona-cms/blocks-meta-loader'

interface ModuleOptions {
  blocks: BlockMeta[]
}

// const options: ModuleOptions = JSON.parse('<%= JSON.stringify(options) %>')

export default async function (context: Context, inject: Function): Promise<void> {
  eventBus.on('sedona:loaded', async () => {
    const { Blocks } = await import('./blocks')
    Vue.prototype.$blocks = new Blocks()
  })
}
