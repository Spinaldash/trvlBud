'use strict';

let Vacation = require('../../models/vacation');


module.exports = {
  handler: function(request, reply){
    Vacation.findById(request.params.vacationId, function(err, vacation) {
      console.log('vacation found in flights.js search:', vacation);
      Vacation.flights(vacation, function(err, flights) {
        reply(flights);
      });
    });
  }
};
