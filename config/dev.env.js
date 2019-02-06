'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	TEST_AUTH: '"wAt5GOk1L4Bm48/YKRpMJEmRUUNhPa8Wc1PZF2L8X/w="'
})
