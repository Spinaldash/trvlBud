'use strict';

let Vacation = require('../../models/vacation');


module.exports = {
  handler: function(request, reply){
    Vacation.flights(request.payload, function(err, flights) {
      reply(flights);
    });
  }
};
