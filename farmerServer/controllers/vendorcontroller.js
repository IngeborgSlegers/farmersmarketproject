const router = require('express').Router()
const sequelize = require('../db')
const Vendor = sequelize.import('../models/vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateSession = require('../middleware/validate-session')

/*********************
 *  VENDOR SIGNUP   * 
*********************/
router.post('/signup', (req, res) => {
  Vendor.create({
    vendorName: req.body.vendorName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  .then(
    createSuccess = (vendor) => {
        let token = jwt.sign({
            id: vendor.id
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

/*********************
 *  VENDOR LOG IN  * 
*********************/
router.post('/login', (req, res) => {
    Vendor.findOne({
        where: { email: req.body.email}
    })
    .then(vendor => {
            if (vendor) {
                bcrypt.compare(req.body.password, vendor.password, (err, matches) => {
                    if(matches) {
                        let token = jwt.sign({
                            id: vendor.id
                        }, "i_am_secret", { expiresIn: 60 * 60 * 24 })

                        res.json({
                            vendor: vendor,
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

/**************************
 *  READ VENDOR INFO  * 
**************************/
router.get('/:id', validateSession, (req, res) => {
    Vendor.findOne({
        where: { id: req.params.id }
    })
    .then(vendor => res.status(200).json(vendor))
    .catch(err => res.status(500).json({
        error: err
    }))
})

/**************************
 *  UPDATE VENDOR INFO  * 
**************************/
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Vendor.update(req.body, { where: { id: req.params.id}})
            .then(vendor => res.status(200).json(vendor))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

/**************************
 *  DELETE VENDOR INFO   * 
**************************/
router.delete('/:id', validateSession, (req, res) => {
    Vendor.destroy({
        where: {
            id: req.vendor.id
        }
    })
    .then(vendor => res.status(200).json(vendor))
    .catch(err => res.status(500).json({
        error: err
    }))
})

module.exports = router;