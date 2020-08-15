const express = require('express')
const searchRouter = require('./routes/searchRouter')
const api = express()

api.use('/search', searchRouter)

module.exports = api