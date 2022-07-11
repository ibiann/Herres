const jwt = require('jsonwebtoken')

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

const verifyMiddleware = (req, res, next) => {
  const token = extractToken(req)
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) return res.status(400).json({ err: err })
    res.locals.user_id = decoded.user._id
    next()
  })
}
module.exports = verifyMiddleware
