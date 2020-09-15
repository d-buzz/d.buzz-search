const { Router } = require('express')
const { 
  authJwtSign,
  authJwtVerify
} = require('../controllers/auth')

const authRouter = Router()
authRouter.post('/jwt-sign', authJwtSign)
authRouter.post('/jwt-verify', authJwtVerify)

module.exports = authRouter