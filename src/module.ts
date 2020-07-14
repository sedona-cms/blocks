import * as path from 'path'
import * as fs from 'fs'
import { Module } from '@nuxt/types'
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import toPairs from 'lodash/toPairs'
import fromPairs from 'lodash/fromPairs'
import flow from 'lodash/flow'
import { BlocksMetaLoader } from '@sedona-cms/blocks-meta-loader'
import { ModuleConfig } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const meta = require('../package.json')

const blocksModule: Module<ModuleConfig> = async function (moduleOptions) {
  const defaultOptions: ModuleConfig = {
    blocksDir: path.resolve(this.options.srcDir || process.cwd(), 'components/blocks'),
    blocksAlias: '~/components/blocks',
  }
  const options = Object.assign({}, moduleOptions, defaultOptions)

  if (typeof this.options.build === 'object') {
    if (Array.isArray(this.options.build.transpile)) {
      this.options.build.transpile.push(meta.name)
    } else {
      this.options.build.transpile = [meta.name]
    }
  }

  console.time('loading blocks')
  if (!fs.existsSync(options.blocksDir)) {
    return Promise.reject(`No block directory in ${options.blocksDir}`)
  }

  /// Load blocks meta
  const loader = new BlocksMetaLoader()
  const blocksMeta = await loader.getMetaFromDirectory(options.blocksDir)
  blocksMeta.map(item => (item.path = `${options.blocksAlias}/${item.path}`))

  const groupedBlocksFunc = flow([
    () => orderBy(blocksMeta, 'name'),
    result => groupBy(result, 'group'),
    result => toPairs(result),
    result => orderBy(result, item => item[0]),
    result => fromPairs(result),
  ])

  console.timeEnd('loading blocks')

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/blocks.js'),
    fileName: path.join('admin/blocks', 'blocks.js'),
    options: {
      blocksMeta,
      groupedBlocksMeta: groupedBlocksFunc(),
    },
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/blocks-plugin.js'),
    fileName: path.join('admin/blocks', 'blocks-plugin.js'),
    options: {
      blocks: blocksMeta,
    },
  })

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join('admin/blocks', 'plugin.js'),
    mode: 'client',
    options: {
      blocks: blocksMeta,
    },
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/blocks-plugin.js'),
    fileName: path.join('admin/blocks', 'blocks-plugin.js'),
    options: {
      blocks: blocksMeta,
    },
  })
}

export default blocksModule
