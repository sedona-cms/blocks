import Vue from 'vue'
import { Blocks } from '../src/templates/blocks'

declare module 'vue/types/vue' {
  interface Vue {
    $blocks: Blocks
  }
}
