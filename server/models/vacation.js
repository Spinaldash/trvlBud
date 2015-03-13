'use strict';

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let stripe = require('stripe')(process.env.STRIPE_SECRET);
let Vacation;

let vacationSchema = mongoose.Schema({
  title: {type: String, lowercase: true},
  arrivalAirport: {type: String, required: true},
  departureAirport: {type: String, required: true},
  arrivalDate: {type: Date, required: true},
  departureDate: {type: Date, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  flight: {
    charge: {
      id: String,
      amount: Number,
      date: {type: Date}
    },
    itinerary: {
      leaving: [{
        departure: String,
        arrival: String,
        duration: Number,
        flight: Number,
        airline: String
      }],
      returning: [{
        departure: String,
        arrival: String,
        duration: Number,
        flight: Number,
        airline: String
      }]
    }
  }
});

vacationSchema.methods.assignItin = function(o) {
  this.flight.itinerary.leaving = o.itinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment.map(s=>{
    return {
      departure: s.DepartureAirport.LocationCode,
      arrival: s.ArrivalAirport.LocationCode,
      duration: s.ElapsedTime,
      flight: s.OperatingAirline.FlightNumber,
      airline: s.OperatingAirline.Code
    }
  });
  this.flight.itinerary.returning = o.itinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment.map(s=>{
    return {
      departure: s.DepartureAirport.LocationCode,
      arrival: s.ArrivalAirport.LocationCode,
      duration: s.ElapsedTime,
      flight: s.OperatingAirline.FlightNumber,
      airline: s.OperatingAirline.Code
    }
  });
};

vacationSchema.methods.purchase = function(o, cb) {
  console.log('o in the model:', o);
  stripe.charges.create({
    amount: Math.ceil(o.cost * 100),
    currency: "usd",
    source: o.token,
    description: o.description
  }, (err,charge)=>{
    if(!err) {
      this.flight.charge.id = charge.id;
      this.flight.charge.amount = charge.amount / 100;
      this.flight.charge.date = new Date;
    }
    cb(err, charge);
  });
};

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
        cb(err, body);
      });
  });
};

Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
