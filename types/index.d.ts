type ModuleConfig = {
  blocksDir: string

}
declare module 'vue/types/vue' {
  import { Blocks } from '../src/templates/blocks'

  interface Vue {
    $blocks: Blocks
  }
}
