const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Hey! This is a test route!');
})

module.exports = router;