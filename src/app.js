
const apiai = require('apiai')
const config = require('../src/config')
const express = require('express')
const crypto = require('crypto')
const bodyParser = require('request')
const request = require('request')
const app = express()
const uuid = require('uuid')

// Facebook messenger API
if (! config.FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN')
}

if (! config.FB_VERIFY_TOKEN) {
    throw new Error('missing FB_VERIFY_TOKEN')
}

if (! config.FB_APP_SECRET) {
    throw new Error('missing FB_APP_SECRET')
}

if (! config.SERVER_URL) {
    throw new Error('missing SERVER_URL')
}

// express server
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), () => {
    console.log('running server on port', app.get('port'))
});