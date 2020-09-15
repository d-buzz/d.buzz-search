const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(!config.search_api_is_private){
        return next();
    }

    if(!token){
        return res.json({ message: 'Invalid signature', status: 400 })
    }
    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);
        if(decoded && decoded.sign === config.jwt_app_signature){
            return next();
        }else{
            return res.json({ message: 'Invalid signature', status: 400 })
        }
    } catch(error) {
        return res.json({ message: error.message, status: 400 })
    }
}
