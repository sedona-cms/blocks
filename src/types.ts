import Vue from 'vue'
import { Blocks } from '@/templates/blocks'

declare module 'vue/types/vue' {
  interface Vue {
    $blocks: Blocks
  }
}

export type BlockData = {
  id: string
  component: string
  props?: Record<string, unknown>
}

export type ModuleConfig = {
  blocksDir: string // directory path with blocks
  blocksAlias: string // path alias for import
}
