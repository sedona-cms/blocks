const baseRoute = env => (env === 'GH_PAGES' ? '/blocks/' : '/')

export default {
  rootDir: 'dev',

  modules: ['@nuxt/http', '@sedona-cms/core', ['../lib/module.js', {}]],

  buildModules: ['@getsedona/nuxt-sedona'],

  sedona: {
    components: ['page', 'scene', 'feature'],
  },

  plugins: [{ src: '~/plugins/admin', mode: 'client' }],

  // watch: ['../lib/*.js', '../lib/**/*.js']

  router: {
    base: baseRoute(process.env.DEPLOY_ENV),
  },

  build: {
    extractCSS: true,
  },
}
