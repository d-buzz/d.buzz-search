const config = require('../../config');
const fetch = require('node-fetch')

const searchUrl = config.search_url
const categoryParam = 'category:'+config.primary_tag
const searchSort = config.search_sort
const searchApiKey = config.search_api_key

// const apiKeys = ['1DOGSLBZRPKCDE0AU6AENLFIMX2DI5E1A9DFJLD8GJTFP1ZTSTAFVKWJNHFS']

let baseRequest = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '',
    'mode': 'no-cors',
    'cache': 'no-cache',
  },
}

const randomIndex = (minimum, maximum) => {
  return Math.round( Math.random() * (maximum - minimum) + minimum);
}

const mainSearchByType = async (searchType, query, otherParams) => {
  const body = { q: `* ${query} ${categoryParam}`, ...otherParams }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey
  
  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  console.log({ request })

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  console.log({
    type: searchType,
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
      count: dataJSON.results ? dataJSON.results.length : 0,
      scroll_id: dataJSON.scroll_id ? dataJSON.scroll_id : null
    },
    message: dataJSON.message,
  })

  return dataJSON;
}

const searchPostByTags = async (req, res) => {
  const tag = req.body.tag
  const sort = req.body.sort || searchSort
  const scroll_id = req.body.scroll_id || ''
  const otherParams = { sort: sort, scroll_id: scroll_id }
  const q = `tag:${tag}`;

  const result = await mainSearchByType('tags',q, otherParams);
  res.json(result); 
}

const searchPostByAuthor = async (req, res) => {
  const author = req.body.author
  const sort = req.body.sort || searchSort
  const scroll_id = req.body.scroll_id || ''
  const otherParams = { sort: sort, scroll_id: scroll_id }
  const q = `author:${author}`;

  const result = await mainSearchByType('author',q, otherParams);
  res.json(result); 
}

const searchPostByQueryString = async (req, res) => {
  const query = req.body.query
  const sort = req.body.sort || searchSort
  const scroll_id = req.body.scroll_id || ''
  const otherParams = { sort: sort, scroll_id: scroll_id }
  const q = `${query}`;

  const result = await mainSearchByType('general',q, otherParams);
  res.json(result); 
}


const searchAccountReplies = async (req, res) => {
  const account = req.body.account
  const sort = req.body.sort || searchSort
  const scroll_id = req.body.scroll_id || ''
  const otherParams = { sort: sort, scroll_id: scroll_id }
  const q = `author:${account} type:comment`;

  const result = await mainSearchByType('replies',q, otherParams);
  res.json(result); 
}

module.exports = { 
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
  searchAccountReplies
}