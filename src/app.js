
const apiai = require('apiai')
const config = require('../src/config')
const express = require('express')
const crypto = require('crypto')
const bodyParser = require('body-parser')
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

// app.use(bodyParser.json({
//     verify: verifyRequestSignature
// }))

app.use(express.static('public'))

app.listen(app.get('port'), () => {
    console.log('running server on port', app.get('port'))
})

app.get('/', (req, res) => {
    res.send('Hello world lets chit chat')  
})

//  Facebook verify
app.get('webhook', (req, res) => {
    console.log('requesting...')
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge'])
    } else {
        console.log('Failed validation. Make sure the validation tokens match.')
        res.sendStatus(403)
    }
})

// Callbacks for messenger are POST'ed
app.post('/webhook/', (req, res) => {
    let data = req.body
    console.log(data)
    if (data.object == 'page') {
        // iterate over each entry
        data.entry.forEach((pageEntry) => {
            let pageID = pageEntry.id
            let timeOfEvent = pageEntry.time
            // iterate over each messaging event
            pageEntry.messaging.forEach((MessageEvent) => {
                if (messagingEvent.optin) {
                    receivedAuthentication(messagingEvent)
                } else if (messageEvent.message) {
                    receivedMessage(messageEvent)
                } else if (messageEvent.postback) {
                    receivedPostback(messagingEvent)
                } else if (messageEvent.read) {
                    receivedMessageRead(messageEvent)
                } else if (messageEvent) {
                    receivedAccountLink(messagingEvent)
                } else {
                    console.log("Webhook received unknown messagingEvent: ", messagingEvent)
                }
            })
        })
        res.sendStatus(200)
    }
})

function receivedMessage(event) {
    let senderID = event.sender.id
    let recipientID = event.recipient.id
    let timeOfMessage = event.timestamp
    let message = event.message

    if (! sessionIds.has(senderID)) {
        sessionIds.set(senderID, uuid.v1())
    }
    //console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    //console.log(JSON.stringify(message));

    let isEcho = message.is_echo
    let messageId = message.id
    let appId = message.app_id
    let metadata = message.metadata

    let messageText = message.text
    let messageAttachments = message.attachments
    let quickReply = message.quick_reply

    if (isEcho) {
        handleEcho(messageId, appId, metadata)
        return
    } else if (quickReply) {
        handleQuickReply(senderID, quickReply, messageId)
        return
    }
}

const dialogFlowService = apiai(config.DIALOGFLOW_CLIENT_ACCESS_TOKEN, {
    language: "EN",
    requestSource: "fb"
})




