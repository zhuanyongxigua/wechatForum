'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log(merge(prodEnv, {
  NODE_ENV: '"development"'
}));

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
