'use strict';

let Vacation = require('../../models/vacation');


module.exports = {
  handler: function(request, reply){
    console.log('request is:', request.params.vacationId);
    Vacation.findById(request.params.vacationId, function(err, vacation) {
      reply({vacation:vacation});
    });
  }
};
