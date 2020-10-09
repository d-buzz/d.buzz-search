const config = require("../../config");
const fetch = require("node-fetch");
const moment = require("moment");

const searchUrl = config.search_url;
const categoryParam = "category:" + config.primary_tag;
const searchSort = config.search_sort;
const searchApiKey = config.search_api_key;

let baseRequest = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
    mode: "no-cors",
    cache: "no-cache",
  },
};

const randomIndex = (minimum, maximum) => {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

const mainSearchByType = async (searchType, query, otherParams) => {
  const body = { q: `* ${query} ${categoryParam}`, ...otherParams };
  const apiKey = searchApiKey;
  baseRequest.headers.Authorization = apiKey;

  const request = {
    ...baseRequest,
    body: JSON.stringify(body),
  };

  // console.log({ request })

  const data = await fetch(searchUrl, request);
  const dataJSON = await data.json();

  console.log({
    type: searchType,
    stats: {
      took: dataJSON.took,
      hits: dataJSON.hits,
      count: dataJSON.results ? dataJSON.results.length : 0,
      scroll_id: dataJSON.scroll_id ? dataJSON.scroll_id : null,
    },
    message: dataJSON.message,
  });

  return dataJSON;
};

const searchPostByTags = async (req, res) => {
  const tag = req.body.tag;
  const sort = req.body.sort || searchSort;
  const scroll_id = req.body.scroll_id || "";
  const otherParams = { sort, scroll_id };
  const q = `tag:${tag}`;

  const result = await mainSearchByType("tags", q, otherParams);
  return res.json(result);
};

const searchPostByAuthor = async (req, res) => {
  const author = req.body.author;
  const sort = req.body.sort || searchSort;
  const scroll_id = req.body.scroll_id || "";
  const otherParams = { sort, scroll_id };
  const q = `author:${author}`;

  const result = await mainSearchByType("author", q, otherParams);
  return res.json(result);
};

const searchPostByQueryString = async (req, res) => {
  const query = req.body.query;
  const sort = req.body.sort || searchSort;
  const scroll_id = req.body.scroll_id || "";
  const otherParams = { sort, scroll_id };
  const q = `${query}`;

  const result = await mainSearchByType("general", q, otherParams);
  return res.json(result);
};

const searchAccountReplies = async (req, res) => {
  const account = req.body.account;
  const sort = req.body.sort || searchSort;
  const scroll_id = req.body.scroll_id || "";
  const otherParams = { sort, scroll_id };
  const q = `author:${account} type:comment`;

  const result = await mainSearchByType("replies", q, otherParams);
  return res.json(result);
};

const countAuthorPostsByTimeUnit = async (req, res) => {
  const author = req.body.author;
  const time_unit = req.body.time_unit || "day"; // day | week | month
  const startDate = moment().startOf(time_unit).format();
  const since = startDate.split("+")[0];
  const sort = "newest";
  const otherParams = { sort, since };
  
  const q = `author:${author} type:post`;
  const result = await mainSearchByType("author", q, otherParams);
  let total_count = 0;
  if (result.results) {
    total_count = result.results.length;
  }
  return res.json({ total_count, time_unit, since });
};

module.exports = {
  searchPostByTags,
  searchPostByQueryString,
  searchPostByAuthor,
  searchAccountReplies,
  countAuthorPostsByTimeUnit,
};
