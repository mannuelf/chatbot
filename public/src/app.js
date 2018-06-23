'use strict';

var apiai = require('apiai');
var config = require('../src/config');
var express = require('express');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var uuid = require('uuid');

// Facebook messenger API
if (!config.FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN');
}

if (!config.FB_VERIFY_TOKEN) {
    throw new Error('missing FB_VERIFY_TOKEN');
}

if (!config.FB_APP_SECRET) {
    throw new Error('missing FB_APP_SECRET');
}

if (!config.SERVER_URL) {
    throw new Error('missing SERVER_URL');
}

// express server
app.set('port', process.env.PORT || 5000);

// app.use(bodyParser.json({
//     verify: verifyRequestSignature
// }))

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('running server on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.send('Hello world lets chit chat');
});

app.get('webhook', function (req, res) {
    console.log('requesting...');
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.log('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
    }
});

var dialogFlowService = apiai(config.DIALOGFLOW_CLIENT_ACCESS_TOKEN, {
    language: "EN",
    requestSource: "fb"
});