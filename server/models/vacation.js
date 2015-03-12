'use strict';

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let Vacation;

let vacationSchema = mongoose.Schema({
  title: {type: String, lowercase: true},
  arrivalAirport: {type: String, required: true},
  departureAirport: {type: String, required: true},
  arrivalDate: {type: Date, required: true},
  departureDate: {type: Date, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now, required: true}
});

vacationSchema.statics.flights = function(o, cb) {
  var options = { //Sets the options for the first request to user key1 to get key2
    method: 'POST',
    url: 'https://api.test.sabre.com/v1/auth/token',
    headers: {
      'Authorization': 'Basic ' + process.env.SABRE64_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  Request(options, function(err, response, body){
    var token = JSON.parse(body).access_token;
      var options = { //sets the options to use key2 to issue the request with the query in the URL
        method: 'GET',
        url: 'https://api.test.sabre.com/v1/shop/flights?origin=' + o.departureAirport + '&destination=' + o.arrivalAirport + '&departuredate=' + moment(o.departureDate).format('YYYY-MM-DD')+ '&returndate=' + moment(o.arrivalDate).format('YYYY-MM-DD'),
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      Request(options, function(err, response, body){
        body = JSON.parse(body);
        console.log('the Cb is taking this body:', body);
        cb(err, body);
      });
  });
};

Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
