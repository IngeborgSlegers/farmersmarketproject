const express = require('express');
const app = express();
const test = require('./controllers/testcontroller');
const market = require('./controllers/marketcontroller');
const sequelize = require('./db');

sequelize.sync(); // tip: pass in {force: true} for resetting tables

app.use('/test', test)
app.use('/market', market)

app.listen(3000, function(){
  console.log('App is listening on 3000.')
});