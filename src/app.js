'use_strict'

import apiai from 'apiai';
import config from '../src/config';
import express from 'express';
import crypto from 'crypto';
import bodyParser from 'request';
import request from 'request';
import uuid from 'uuid';
const app = express()

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), () => {
    console.log('running server on por', app.get('port'))
});