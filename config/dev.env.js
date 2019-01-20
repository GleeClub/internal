'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	TEST_AUTH: '"AcGuO6+kAWp11AQ+SKQWfD/bekyKoXkYkzh/vZNshuQ="'
})
