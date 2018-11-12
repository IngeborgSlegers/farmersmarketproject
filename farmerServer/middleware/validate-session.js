const jwt = require('jsonwebtoken')
const Vendor = require('../db').import('../models/vendor')

const validateSession = (req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(!err && decodedToken) {
      Vendor.findOne({ where: { id: decodedToken.id }})
      .then(vendor => {
        if(!vendor) throw 'err'
        req.vendor = vendor
        return next()
      })
      .catch(err => next(err))
    } else {
      req.errors = err
      return next()
    }
  })
}

module.exports = validateSession