const searchUrl = 'https://api.hivesearcher.com/search'
const categoryParam = 'category:hive-193084'
const searchSort = "newest"
const searchApiKey = 'DRHJ6EFF0W8UBDQNEENAXWCDUPJSZIXXYTGB1JYWWZQ3RF8G1QRFOZ6SFUCK'
const fetch = require('node-fetch')

let baseRequest = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '',
    'mode': 'no-cors',
    'cache': 'no-cache',
  },
}

const searchPostByTags = async (req, res) => {
  const tag = req.body.tag
  const sort = { sort: req.body?.sort || searchSort }
  const body = { q: `* tag:${tag} ${categoryParam}`, ...sort }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

const searchPostByAuthor = async (req, res) => {
  const author = req.body.author
  const sort = { sort: req.body?.sort || searchSort }
  const body = { q: `* author:${author} ${categoryParam}`, ...sort }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

const searchPostByQueryString = async (req, res) => {
  const query = req.body.query
  const sort = { sort: req.body?.sort || searchSort }
  const body = { q: `${query} ${categoryParam}`, ...sort }
  const apiKey = searchApiKey
  baseRequest.headers.Authorization = apiKey
  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

module.exports = { searchPostByTags, searchPostByQueryString, searchPostByAuthor }
