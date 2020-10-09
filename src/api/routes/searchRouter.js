const { Router } = require('express')
const { 
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
  searchAccountReplies,
  countAuthorPostsByTimeUnit
} = require('../controllers/search')

const searchRouter = Router()

searchRouter.post('/tags', searchPostByTags)
searchRouter.post('/query', searchPostByQueryString)
searchRouter.post('/author', searchPostByAuthor)
searchRouter.post('/replies', searchAccountReplies)
searchRouter.post('/post-count', countAuthorPostsByTimeUnit)

module.exports = searchRouter