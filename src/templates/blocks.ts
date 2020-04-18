import { BlockMeta } from '@sedona-cms/blocks-meta-loader'

type GroupedMeta = {
  [key: string]: BlockMeta
}

const blocksMeta: ReadonlyArray<BlockMeta> = Object.freeze(
  JSON.parse('<%= JSON.stringify(options) %>')
)

export class Blocks {
  get meta(): ReadonlyArray<BlockMeta> {
    return blocksMeta
  }

  get groupedMeta(): Map<string, BlockMeta> {
    const meta = new Map<string, BlockMeta>()
    for (const metaItem of blocksMeta) {
      meta.set(metaItem.group || 'general', metaItem)
    }
    return meta
  }
}
