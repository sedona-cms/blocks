import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
// import { BlockMeta } from '@sedona-cms/blocks-meta-loader'

/* interface ModuleOptions {
  blocks: BlockMeta[]
} */

const blocksPlugin: Plugin = () => {
  eventBus.on('sedona:loaded', async () => {
    const { Blocks } = await import('./blocks')
    Vue.prototype.$blocks = new Blocks()
  })
}

export default blocksPlugin
