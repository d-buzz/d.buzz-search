
const jwt = require('jsonwebtoken');
const config = require('../../config');

// GENERATES JWT
const authJwtSign = (req, res) => {
    const author = req.body.author
    if(!author){
        return res.json({ data: null, error: 'Author is required'})
    }
    try {
        const token = jwt.sign({ sign: config.jwt_app_signature,
                                 username: author }, 
                                 config.jwt_secret_key, 
                               { expiresIn: '1d' });

        return res.json({ data: token, error: null })
    } catch (error) {
        return res.json({ data: null, error: error.message })
    }
}

// VERIFIES JWT
const authJwtVerify = (req, res) => {
    const token = req.body.token
    if(!token){
        return res.json({data: null, error: 'Token is required'})
    }
    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);
        if(decoded && decoded.sign === config.jwt_app_signature){
            return res.json({ data: decoded, error: null })
        }else{
            return res.json({ data: null, error: 'Invalid signature' })
        }
    } catch(error) {
        return res.json({ data: null, error: error.message })
    }
}

module.exports = {
    authJwtSign,
    authJwtVerify
}