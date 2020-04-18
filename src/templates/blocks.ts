import groupBy from 'lodash/groupBy'
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

  get groupedMeta(): Readonly<GroupedMeta> {
    return groupBy(blocksMeta, 'group') as Readonly<GroupedMeta>
  }
}
