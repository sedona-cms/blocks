type BlockMeta = {
  name?: string
  description?: string
  icon?: string // default is 'extension'
  group?: string // default is 'general'
  props?: {
    [key: string]: BlockProp
  }
}

type BlockProp = {
  type?: string
  required?: boolean
  default?: any
}

type BlockPropDefault = {
  type?: any
  default?: any
}
