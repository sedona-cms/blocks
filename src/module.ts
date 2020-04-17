import * as path from 'path'
import * as fs from 'fs'
import { Module } from '@nuxt/types'
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
  const meta = await loader.getMetaFromDirectory(moduleOptions.blocksDir)

  console.log(meta)

  console.timeEnd('loading blocks')
}

export default blocksModule
