const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res
      .status(401)
      .json({
        error: 'authentication is required'
      })
  }
  if (!authorization.match(/^Bearer\s\w+/)) {
    return res
      .status(401)
      .json({
        error: 'token invalid'
      })
  }
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, 'S3cr3t-k3y')
    req.email = decoded.email
    next()
  } catch (err) {
    res
      .status(401)
      .json({ error: err.message })
  }
}
