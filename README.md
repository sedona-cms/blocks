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
    
## Development

1. Install dependencies

```bash
npm ci
```

```bash
npx npm-self-link # links the package in which it is run
```

2. Run watch process

```bash
npm run watch # typescript watch process
```

3. Run nuxt project from `dev` directory

```bash
npm run dev
```

