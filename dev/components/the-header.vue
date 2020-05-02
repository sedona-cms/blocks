<template>
  <header class="text-gray-700 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <nuxt-link to="/about" class="mr-5 hover:text-gray-900">About</nuxt-link>
        <nuxt-link to="/posts" class="mr-5 hover:text-gray-900">Posts</nuxt-link>
        <nuxt-link to="/products" class="mr-5 hover:text-gray-900">Products</nuxt-link>
        <nuxt-link to="/contact" class="mr-5 hover:text-gray-900">Contact</nuxt-link>
      </nav>
      <nuxt-link
        to="/"
        class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Sedona CMS</span>
      </nuxt-link>
      <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <button
          class="inline-flex items-center border-0 py-1 px-3 focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 md:mt-0"
          @click="load"
        >
          Try blocks
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'TheHeader',
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      async load() {
        this.loading = true
        window.history.pushState('', '', `${location.href}?loggedIn=true`)
        await this.$adminLoader.load()
        // this.isLogged = true
        this.loading = false
      },
    },
  }
</script>
