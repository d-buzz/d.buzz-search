const searchUrl = 'https://api.hivesearcher.com/search'
const categoryParam = 'category:hive-193084'
const searchSort = { sort: "newest" }
const searchApiKey = 'A2VZE4DZLUIOYTLADYXIDHZAOR3PSIKUXDUMKPBUTBM8ZIWJOVZXC23CMM4C'
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
  const sort = { sort: req.body?.sort || 'newest' }
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
  const body = { q: `* author:${author} ${categoryParam}`, ...searchSort }
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
  const body = { q: `${query} ${categoryParam}`, ...searchSort }
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
