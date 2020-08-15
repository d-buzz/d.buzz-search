const { Router } = require('express')
const { searchPostByTags, searchPostByQueryString } = require('../controllers/search')

const searchRouter = Router()

searchRouter.post('/tags', searchPostByTags)
searchRouter.post('/query', searchPostByQueryString)

module.exports = searchRouter