import { BlockMeta } from '@sedona-cms/blocks-meta-loader'

const blocksMeta: ReadonlyArray<BlockMeta> = Object.freeze(
  JSON.parse('<%= JSON.stringify(options.blocksMeta) %>')
)

const groupedBlocksMeta: { [key: string]: BlockMeta[] } = Object.freeze(
  JSON.parse('<%= JSON.stringify(options.groupedBlocksMeta) %>')
)

export class Blocks {
  get meta(): ReadonlyArray<BlockMeta> {
    return blocksMeta
  }

  get groupedMeta(): { [key: string]: BlockMeta[] } {
    return groupedBlocksMeta
  }
}
