<p align="center">
  <h3 align="center">Blocks Editor</h3>

  <p align="center">
    Block editor for Sedona CMS
    <br />
    <br />
    <a href="https://sedona-cms.github.io/blocks/?loggedIn=true">View Demo</a>
    ·
    <a href="https://github.com/sedona-cms/blocks/issues">Report Bug</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
* [Usage](#usage)
  * [Built in prop editors](#built-in-prop-editors)
  * [Create own prop editor](#create-own-prop-editor)
* [Development](#development)
  
## About the project

Block editor for Sedona CMS

### Built With

* [Nuxt.js](https://nuxtjs.org/)
* [Quasar Framework](https://quasar.dev/)
* [Material Icons](https://material.io/resources/icons/)

## Getting Started

### Prerequisites

* [Nuxt.js](https://nuxtjs.org/)
* [Sedona CMS core](https://github.com/sedona-cms/core)

### Setup

1. Add and setup `@sedona-cms/core`. [Setup instructions](https://github.com/sedona-cms/core#setup) 

2. Add `@sedona-cms/blocks` dependency to your project

```bash
npm i @sedona-cms/blocks # or yarn add @sedona-cms/blocks
```

3. Add `@sedona-cms/blocks` to the `modules` section of `nuxt.config.js`

4. Create required directories ([Will be fixed](../../issues/2)):
    1. `~/admin/props` – custom prop editors
    2. `~/components/blocks`– block components

## Usage

### Built-In Prop Editors

1. Text
2. Textarea
3. Checkbox
4. Number
5. Date
6. Wysiwyg

### Create own prop editor

A prop editor is a simple Vue component. All custom editors should be saved in `~/admin/props` directory.

In a prop, the editor component can use Quasar components.

#### Step by step guide

1. Create a Vue component in `~/admin/props` directory
2. Add required props: title and value
3. The title prop can have an empty default value
4. The value prop will fill data from the editor
5. For updating data in the editor send `change` event

Example:

```vue
<template>
  <q-field :label="title" outlined stack-label dark>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <select v-model="color" class="full-width text-black">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </template>
  </q-field>
</template>

<script>
  export default {
    name: 'Color',
    props: {
      title: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        color: this.value,
      }
    },
    watch: {
      color(value) {
        this.$emit('change', value)
      },
    },
  }
</script>
```
    
## Development

1. Install dependencies

```bash
npm ci
```

2. Link the package in which it is run

```bash
npx npm-self-link
```

3. Run watch process

```bash
npm run watch
```

4. Run nuxt project from `dev` directory

```bash
npm run dev
```

