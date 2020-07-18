import Vue from 'vue'

const state = Vue.observable({
  isOpen: false as boolean,
})

const mutations = {
  setOpen: (value: boolean): void => {
    state.isOpen = value
  },
}

const palette = { state, mutations }

export { palette }
