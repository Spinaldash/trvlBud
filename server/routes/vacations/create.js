'use strict';

let Vacation = require('../../models/vacation');
let Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      arrivalAirport: Joi.string().length(3).required(),
      departureAirport: Joi.string().length(3).required(),
      departureDate: Joi.date().min('now'),
      arrivalDate: Joi.date().min('now')
    }
  },
  handler: function(request, reply){
    request.payload.userId = request.auth.credentials._id;
    let vacation = new Vacation(request.payload);
    vacation.save((err)=>{
      if(err){
        console.log('error in create.js')
      } else {
      reply(vacation._id);
      }
    });
  }
};
