import indexPage from '~/assets/data/index.json'
import aboutPage from '~/assets/data/about.json'
import contactPage from '~/assets/data/contact.json'

export const state = () => ({
  pages: {
    index: indexPage,
    about: aboutPage,
    contact: contactPage,
  },
})

export const getters = {
  pageBySlug: store => slug => store.pages[slug],
  pageExists: store => slug => store.pages[slug] !== undefined,
}

export const mutations = {
  SET_PAGE(state, { slug, page }) {
    state.pages[slug] = page
  },
  SET_PAGE_CONTENT(state, { slug, blocks = [] }) {
    state.pages[slug]['content'] = [...blocks]
  },
}

export const actions = {}
