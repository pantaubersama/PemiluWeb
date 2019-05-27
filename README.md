[![Build Status Staging](https://travis-ci.com/pantaubersama/PemiluWeb.svg?branch=staging)](https://travis-ci.com/pantaubersama/PemiluWeb)
[![Build Status Production](https://travis-ci.com/pantaubersama/PemiluWeb.svg?branch=master)](https://travis-ci.com/pantaubersama/PemiluWeb)

# pantau-bersama

> pantau-bersama

## Setup

- Copy `env.example` to dev.js
- Run all commands below

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Travis CI

Maintainer need to update Travis Variables when developers updating env.

- `travis login --pro`
- `rm travis_secret.tar`
- `tar cvf travis_secret.tar .travis`
- `travis encrypt-file travis_secret.tar -r pantaubersama/PemiluWeb --pro`
- `add, commit, pull request`

