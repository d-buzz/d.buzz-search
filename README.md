# Hive Searcher Wrapper
Wraps hive searcher for d.buzz searches

**Setup**
- clone the repository
- npm install
- npm start

#### SEARCH ENDPOINTS
Note: If config 'search_api_is_private' is set to TRUE. Need to include Authorization header to allow search or else will get this response:
```
{
    "message": "invalid signature",
    "status": 400
}
```
##### POST /api/v1/search/tags
Search posts by tags 
###### Query Parameters JSON
```
{
    "tag": string|required,
    "sort": string,
    "scroll_id": string
}
```
###### Expected Response JSON
```
{
    "took": 0.012,
    "hits": 1319,
    "results": [],
    "scroll_id" : ''
}
```
##### POST /api/v1/search/author
Search posts by author 
###### Query Parameters JSON
```
{
    "author": string|required,
    "sort": string,
    "scroll_id": string
}
```
###### Expected Response JSON
```
{
    "took": 0.012,
    "hits": 1319,
    "results": [],
    "scroll_id" : ''
}
```
##### POST /api/v1/search/replies
Search author replies
###### Query Parameters JSON
```
{
    "account": string|required,
    "sort": string,
    "scroll_id": string
}
```
###### Expected Response JSON
```
{
    "took": 0.012,
    "hits": 1319,
    "results": [],
    "scroll_id" : ''
}
```
##### POST /api/v1/search/query
Search posts by query
###### Query Parameters JSON
```
{
    "query": string|required,
    "sort": string,
    "scroll_id": string
}
```
###### Expected Response JSON
```
{
    "took": 0.012,
    "hits": 1319,
    "results": [],
    "scroll_id" : ''
}
```
##### POST /api/v1/search/post-count
Get posts count by unit of time (default: 'day')
###### Query Parameters JSON
```
{
    "author": string|required,
    "time_unit": string,
}
```
###### Expected Response JSON
```
{
    "total_count": 0,
    "time_unit": "day",
    "since": "2020-10-09T00:00:00"
}
```
#### AUTH ENDPOINTS
##### POST /api/v1/auth/jwt-sign
Generates JWT for specific user; Expired after 1 day
###### Query Parameters JSON
```
{
    "author": string|required
}
```
###### Expected Response JSON
```
{
    "data": "eyJhbGciOiJ...",
    "error": null
}
```
##### POST /api/v1/auth/jwt-verify
Validates JWT
###### Query Parameters JSON
```
{
    "token": string|required
}
```
###### Expected Response JSON
```
{
     "data": {
        "sign": "secret",
        "username": "dbuzz",
        "iat": 1602233661,
        "exp": 1602320061
    },
    "error": null
}
```