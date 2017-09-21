"use strict";

const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');

const app = express();

//mongoose.connect('mongodb://127.0.0.1:27017/testdb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function(req, res, next){
  console.log('Got request', req.path, req.method);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.use(express.static('../frontend'))


let options = {
   key  : fs.readFileSync('./certs/testing.key'),
   cert : fs.readFileSync('./certs/testing.crt')
};

require('./api/routes/main')(app);


const PORT = 8080;
https.createServer(options, app).listen(PORT, function () {
  console.log('App is running and listening on', PORT);
});
