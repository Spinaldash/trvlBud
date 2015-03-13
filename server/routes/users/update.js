'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email(),

    }
  },
  handler: function(request, reply){
    User.find({userId:request.auth.credentials._id}, function(err, user) {
      if(err){return reply().code(400);}
      user.save;
    });
  }
};
