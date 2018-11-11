const express = require('express');
const router = express.Router();
const sequelize = require('../db');

router.post('/one', function(req, res){
  res.send("Test 1 went through!")
});

module.exports = router;