/**
 * Admin load
 *
 * @param {Context} context nuxt context
 * @returns {Promise<void>}
 */
export default async function (context) {
  if (context.query.loggedIn === 'true') {
    await context.$adminLoader.load()
  }
}
