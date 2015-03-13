/* global StripeCheckout:true */

'use strict';

angular.module('angular-prototype')
.directive('mjStripe', [()=>{
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/mj-stripe.html';
  o.scope = {
    vacation: '=',
    description:'=',
    cost:'=',
    itinerary: '='
  };
  o.controller = ['$scope','$rootScope', 'Vacation', ($scope, $rootScope, Vacation)=>{
    $scope.purchase = function(){
      var info = {
        vacation:$scope.vacation,
        cost:$scope.cost,
        description:$scope.description,
        itinerary:$scope.itinerary,
      };

      $rootScope.$broadcast('purchase', info);
    };
  }];
  return o;
}]);
