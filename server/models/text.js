'use strict'

let client = require('twilio')(process.env.TWILIO_PUBLIC, process.env.TWILIO_SECRET);

class Text {
  static send(to, body, cb){
    console.log('TO,BODY', to, body);
    client.messages.create({
      body:body,
      to:to,
      from: '+14153196113'
    }, cb);
  }
}

module.exports = Text;
