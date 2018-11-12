require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');
const bodyParser = require('body-parser');

const test = require('./controllers/testcontroller');
const market = require('./controllers/marketcontroller');
const vendor = require('./controllers/vendorcontroller');


sequelize.sync(); 
// tip: pass in {force: true} for resetting tables

app.use(bodyParser.json());

app.use(require('./middleware/headers'))

app.use('/test', test)
app.use('/market', market)
app.use('/vendor', vendor)

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}.`)
});