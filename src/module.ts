import * as path from 'path'
import * as fs from 'fs'
import { Module } from '@nuxt/types'
// import { BlocksMetaLoader } from '@sedona-cms/blocks-meta-loader'

export const meta = require('../package.json')

const defaultOptions: ModuleConfig = {
  // blocksDir: path.resolve(this.options.srcDir || process.cwd(), 'components/blocks'),
}

const blocksModule: Module<ModuleConfig> = async function (moduleOptions) {
  console.time('loading blocks')

  // console.log(this.options)

  //blocksDirectory = path.resolve(this.options.srcDir || process.cwd(), blocksDirectory)
  // if (!fs.existsSync(blocksDirectory)) {
  //  throw new Error(`No block directory in ${blocksDirectory}`)
  // }

  /// Load blocks meta
  // const loader = new BlocksMetaLoader()
  // const meta = loader.getMetaFromFile(fs.readdirSync(blocksDirectory))

  // console.log(meta)

  console.timeEnd('loading blocks')
}

export default blocksModule
