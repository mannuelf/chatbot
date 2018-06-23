'use strict';

var apiai = require('apiai');
var config = require('../src/config');
var express = require('express');
var crypto = require('crypto');
var bodyParser = require('request');
var request = require('request');
var app = express();
var uuid = require('uuid');

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('running server on port', app.get('port'));
});