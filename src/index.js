const express = require('express')
const api = require('./api')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    status: 'online',
  })
})

app.use('/api/v1', api)
app.listen(config.port, () => console.log('server running on port '+config.port))