/* global StripeCheckout:true */

'use strict';

angular.module('angular-prototype')
.directive('mjStripeBrain', [()=>{
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/mj-stripe-brain.html';
  o.scope = {};
  o.controller = ['$scope', '$rootScope', 'Vacation', ($scope, $rootScope, Vacation)=>{
    let data;
    let handler = StripeCheckout.configure({
     key: 'pk_test_5TCLSIZRXcfM5AqQB81AFdX7',
     image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
     token: function(token) {
       data.token = token.id;
       console.log('data:', data);
       Vacation.purchaseFlight(data.vacation, data)
       .then(response=>{
         $rootScope.$broadcast('flight-purchased', response.data);
       });
     }
   });

  $scope.$on('purchase', (event, info)=>{
    data = info;

    handler.open({
      name: 'Trvl Bud',
      description: info.description,
      amount: info.cost * 100
    });
  });
}];




  return o;
}]);
