const blocksMeta: ReadonlyArray<BlockMeta> = Object.freeze(
  JSON.parse('<%= JSON.stringify(options) %>')
)

export class Blocks {
  get meta(): ReadonlyArray<BlockMeta> {
    return blocksMeta
  }
}
