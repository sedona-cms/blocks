export const state = () => ({
  pages: {},
})

export const getters = {
  pageBySlug: store => slug => store.pages[slug],
}

export const mutations = {
  SET_PAGE(state, { slug, page }) {
    state.pages[slug] = page
  },
  SET_PAGE_CONTENT(state, { slug, blocks = [] }) {
    state.pages[slug]['content'] = [...blocks]
  },
}

export const actions = {
  async loadPage({ commit }, { slug }) {
    const page = await this.$http.$get(`data/${slug}.json`)
    commit('SET_PAGE', { slug, page })
  },
}
