export const state = () => ({
  pages: {},
})

export const getters = {
  pageBySlug: store => slug => store.pages[slug],
}

export const mutations = {
  ADD_PAGE(state, { slug, page }) {
    state.pages[slug] = page
  },
}

export const actions = {
  async loadPage({ commit }, { slug }) {
    const page = await this.$http.$get(`data/${slug}.json`)
    commit('ADD_PAGE', { slug, page })
  },
}
