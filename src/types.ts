export type BlockData = {
  id: string
  component: string
  props?: { [key: string]: any }
}

export type MutationPayload = {
  type: string
  payload: any
}
