'use strict'
const merge = require('webpack-merge')
const env = require('./env/prod')

module.exports = merge(env, {
  NODE_ENV: '"production"'
})
