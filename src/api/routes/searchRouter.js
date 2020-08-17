const { Router } = require('express')
const { 
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
} = require('../controllers/search')

const searchRouter = Router()

searchRouter.post('/tags', searchPostByTags)
searchRouter.post('/query', searchPostByQueryString)
searchRouter.post('/author', searchPostByAuthor)

module.exports = searchRouter