const searchUrl = 'https://api.search.esteem.app/search'
const categoryParam = 'category:hive-193084'
const searchSort = { sort: "popularity" }
const searchApiKey = 'K1GJEM2XVI4LISLEZAYREFH7JDOCFMDFIDSHN62EUHD6SLASLDHFDEQ25SRV'
const fetch = require('node-fetch')

const apiKeys = ['ISMIUIZGZFPYKA9O1MRJYBKT2OZJHMPFDSBN88GATYXYOIIODHT3JOAPTG9A']

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
  const apiKey = apiKeys[0]
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
  const apiKey = apiKeys[0]
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
  const apiKey = apiKeys[0]
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

module.exports = { searchPostByTags, searchPostByQueryString, searchPostByAuthor }