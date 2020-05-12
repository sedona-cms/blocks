<template>
  <section class="text-gray-700 body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <img
          class="object-cover object-center rounded"
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
      </div>
      <div
        class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          {{ title }}
        </h1>
        <p v-if="excerpt" class="mb-8 leading-relaxed">
          {{ excerpt }}
        </p>
        <div v-if="showButtons" class="flex justify-center">
          <button
            class="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg"
          >
            Button
          </button>
          <button
            class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'HeroBlock',
    props: {
      title: {
        type: String,
        default: 'Default title',
      },
      excerpt: {
        type: String,
        default: '',
      },
      showButtons: Boolean,
    },
    mounted() {
      console.log(this.$vnode.key)
    },
  }
</script>

<block>
  {
    "props": {
        "excerpt": {
            "editor": "textarea"
        }
    }
  }
</block>
