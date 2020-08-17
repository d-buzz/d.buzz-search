const searchUrl = 'https://api.search.esteem.app/search'
const categoryParam = 'category:hive-193084'
const searchSort = { sort: "popularity" }
const searchApiKey = 'K1GJEM2XVI4LISLEZAYREFH7JDOCFMDFIDSHN62EUHD6SLASLDHFDEQ25SRV'
const fetch = require('node-fetch')

const apiKeys = [ 'GSNWYJWHGJH1Y2YXNDOJENUJYTQSYCW8C1X7HW36NXUXW7GFGLLTOQTPZ4JB' ]

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
  const body = { q: `${tag} tag:${tag} ${categoryParam}`, ...searchSort }
  const apiKey = apiKeys[0]
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  console.log({ request })

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

const searchPostByAuthor = async (req, res) => {
  const author = req.body.author
  const body = { q: `${author} author:${author} ${categoryParam}`, ...searchSort }
  const apiKey = apiKeys[0]
  baseRequest.headers.Authorization = apiKey

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  console.log({ request })

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

const searchPostByQueryString = async (req, res) => {
  const tag = req.body.query
  const body = { q: `${tag} ${categoryParam}`, ...searchSort }
  const apiKey = apiKeys[0]
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