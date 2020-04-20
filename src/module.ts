import * as path from 'path'
import * as fs from 'fs'
import { Module } from '@nuxt/types'
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import toPairs from 'lodash/toPairs'
import fromPairs from 'lodash/fromPairs'
import flow from 'lodash/flow'
import { BlocksMetaLoader } from '@sedona-cms/blocks-meta-loader'

export const meta = require('../package.json')

const blocksModule: Module<ModuleConfig> = async function (moduleOptions) {
  const defaultOptions: ModuleConfig = {
    blocksDir: path.resolve(this.options.srcDir || process.cwd(), 'components/blocks'),
  }
  moduleOptions = Object.assign({}, moduleOptions, defaultOptions)

  console.time('loading blocks')
  if (!fs.existsSync(moduleOptions.blocksDir)) {
    return Promise.reject(`No block directory in ${moduleOptions.blocksDir}`)
  }

  /// Load blocks meta
  const loader = new BlocksMetaLoader()
  const blocksMeta = await loader.getMetaFromDirectory(moduleOptions.blocksDir)

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

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join('admin/blocks', 'plugin.js'),
    mode: 'client',
    options: {
      blocks: blocksMeta,
    },
  })
}

export default blocksModule
