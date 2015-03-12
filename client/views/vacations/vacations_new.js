'use strict';

angular.module('angular-prototype')
  .controller('VacationsNewCtrl', ['$scope', '$state', 'Vacation', function($scope, $state, Vacation){
    $scope.submit = function(vacation) {
      Vacation.create(vacation)
      .then(response=>{
        $state.go('vacations.show', {vacationId:response.data});
      });
    };
}]);
