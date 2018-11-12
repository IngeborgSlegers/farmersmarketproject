const router = require('express').Router()
const sequelize = require('../db')
const Vendor = sequelize.import('../models/vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateSession = require('../middleware/validate-session')

/* VENDOR SIGNUP */
router.post('/signup', (req, res) => {
  Vendor.create({
    vendorName: req.body.vendorName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  .then(
    createSuccess = (vendor) => {
        let token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        })

        res.json({
            vendor: vendor,
            message: 'vendor created',
            sessionToken: token
        })
    },
    createError = err => res.send(500, err.message)
)
})

/* VENDOR LOG IN */
router.post('/login', (req, res) => {
    Vendor.findOne({
        where: { email: req.body.email}
    })
    .then(
        vendor => {
            if (vendor) {
                bcrypt.compare(req.body.password, password, (err, matches) => {
                    if(matches) {
                        let token = jwt.sign({
                            id: vendor.id
                        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                        res.json({
                            venfor: vendor,
                            message: 'successfully authenticated',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({
                            error: 'bad gateway/passwords didn\'t match'
                        })
                    }
                })
            } else {
                res.status(500).send({
                    error: 'failed to authenticated'
                })
            }
        },
        err => res.status(501).send({
            error: 'failed to process'
        })
    )
})

module.exports = router;