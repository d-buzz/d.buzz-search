const searchUrl = 'https://api.search.esteem.app/search'
const categoryParam = 'category:hive-193084'
const searchSort = { sort: "newest" }
const searchApiKey = 'XSXZDU91DDXWS6MVKMFUD25N79XCVZL3FFMP9JLONV5AQAGWPSDMBTEFOYU8  '
const fetch = require('node-fetch')

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

const searchPostByTags = async (req, res) => {
  const tag = req.body.tag
  const body = { q: `* tag:${tag} ${categoryParam}`, ...searchSort }
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
    type: 'tags',
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
    },
    message: dataJSON.message,
  })

  res.json(dataJSON)
}

const searchPostByAuthor = async (req, res) => {
  const author = req.body.author
  const body = { q: `* author:${author} ${categoryParam}`, ...searchSort }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  console.log({
    type: 'author',
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
    },
    message: dataJSON.message,
  })

  res.json(dataJSON)
}

const searchPostByQueryString = async (req, res) => {
  const query = req.body.query
  const body = { q: `${query} ${categoryParam}`, ...searchSort }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey
  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  console.log({
    type: 'general',
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
    },
    message: dataJSON.message,
  })
  
  res.json(dataJSON)
}


const searchAccountReplies = async (req, res) => {

  console.log({ body: req.body })

  const account = req.body.account
  const body = { q: `* author:${account} ${categoryParam}`, ...searchSort, type: 'comment' }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  console.log({
    type: 'replies',
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
    },
    message: dataJSON.message,
  })
  
  res.json(dataJSON)
}

module.exports = { 
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
  searchAccountReplies
}