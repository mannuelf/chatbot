
const apiai = require('apiai')
const config = require('../src/config')
const express = require('express')
const crypto = require('crypto')
const bodyParser = require('request')
const request = require('request')
const app = express()
const uuid = require('uuid')

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), () => {
    console.log('running server on port', app.get('port'))
});