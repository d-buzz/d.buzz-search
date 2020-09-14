const express = require('express')
const searchRouter = require('./routes/searchRouter')
const authRouter = require('./routes/authRouter')
const authGuard = require('./middlewares/authGuard');
const api = express()

api.use('/auth', authRouter)
api.use('/search', authGuard, searchRouter)

module.exports = api