const router = require('express').Router();
const Market = require('../db').import('../models/market');

router.get('/', (req, res) => {
  Market.findAll()
      .then(market => res.status(200).json(market))
      .catch(err => res.status(500).json({ error: err }))
})

router.post('/', (req, res) => {
  if(!req.errors) {
    const marketRequest = {
      marketName: req.body.marketName,
      neighborhood: req.body.neighborhood,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      address: req.body.address
    }
    Market.create(marketRequest)
      .then(market => res.status(200).json(market))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.get('/:id', (req, res) => {
  Market.findOne({ where: { id: req.params.id }})
    .then(market => res.status(200).json(market))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/:id', (req, res) => {
  if(!req.errors) {
    Market.update(req.body, { where: { id: req.params.id }})
    .then(market => res.status(200).json(market))
    .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/:id', (req, res) => {
  Market.destroy({ where: {id: req.params.id }})
  .then(market => res.status(200).json(market))
  .catch(err => res.status(500).json({ error: err}))
})

module.exports = router;