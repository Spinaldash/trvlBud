'use strict';

let Vacation = require('../../models/vacation');


module.exports = {
  handler: function(request, reply){
    Vacation.find({userId:request.auth.credentials._id}, function(err, vacations) {
      reply({vacations:vacations});
    });
  }
};
