'use strict'
const merge = require('webpack-merge')
const env = require('./env/dev')

module.exports = merge(env, {
  NODE_ENV: '"development"'
})
