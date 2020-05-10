# Blocks Editor

Block editor for Sedona CMS

[Demo](https://sedona-cms.github.io/blocks/?loggedIn=true)

## Setup

1. Add and setup `@sedona-cms/blocks`. [Setup instructions](https://github.com/sedona-cms/core#setup) 

2. Add `@sedona-cms/blocks` dependency to your project

```bash
npm i @sedona-cms/blocks # or yarn add @sedona-cms/blocks
```

3. Add `@sedona-cms/blocks` to the `modules` section of `nuxt.config.js`

4. Create required directories ([Will be fixed](../../issues/2)):
    1. `~/admin/props` – custom prop editors
    2. `~/components/blocks`– block components
