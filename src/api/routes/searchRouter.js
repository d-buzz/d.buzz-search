const { Router } = require('express')
const { 
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
  searchAccountReplies,
} = require('../controllers/search')

const searchRouter = Router()

searchRouter.post('/tags', searchPostByTags)
searchRouter.post('/query', searchPostByQueryString)
searchRouter.post('/author', searchPostByAuthor)
searchRouter.post('/replies', searchAccountReplies)

module.exports = searchRouter