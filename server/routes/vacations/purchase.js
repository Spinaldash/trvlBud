'use strict';

let Vacation = require('../../models/vacation');
let Txt = require('../../models/text');


module.exports = {
  handler: function(request, reply){
    Vacation.findById(request.params.vacationId, (err, vaca)=>{
      vaca.purchase(request.payload, (err, charge)=>{
        if(err){return reply().code(400);}

        vaca.assignItin(request.payload);

        Txt.send('7039092189', `Success! Your CC was charged $${vaca.flight.charge.amount.toFixed(2)}.`, (err, msg)=>{
          vaca.save(()=> {
            reply(vaca);
          });
        })
      });
    });
  }
};
