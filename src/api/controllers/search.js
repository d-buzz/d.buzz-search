const searchUrl = 'https://api.search.esteem.app/search'
const categoryParam = 'category:hive-193084'
const searchSort = { sort: "popularity" }
const searchApiKey = 'K1GJEM2XVI4LISLEZAYREFH7JDOCFMDFIDSHN62EUHD6SLASLDHFDEQ25SRV'
const fetch = require('node-fetch')

const baseRequest = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': searchApiKey,
    'mode': 'no-cors',
    'cache': 'no-cache',
  },
}

const searchPostByTags = async (req, res) => {
  const tag = req.body.tag
  const body = { q: `${tag} tag:${tag} ${categoryParam}`, ...searchSort }
  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

const searchPostByQueryString = async (req, res) => {
  const tag = req.body.query
  const body = { q: `${tag} ${categoryParam}`, ...searchSort }
  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  }

  const data = await fetch(searchUrl, request)
  const dataJSON = await data.json()

  res.json(dataJSON)
}

module.exports = { searchPostByTags, searchPostByQueryString }