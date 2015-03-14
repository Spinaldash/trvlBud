'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  auth: false,
  handler: function(request, reply){
    console.log('REQUEST.payload:', request.payload);
    User.findOneAndUpdate({_id:request.payload._id}, request.payload, function(err, user) {
      if(err){return reply().code(400);}
    });
  } 
};
