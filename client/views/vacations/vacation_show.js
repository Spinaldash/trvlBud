'use strict';

angular.module('angular-prototype')
  .controller('VacationsShowCtrl', ['$scope', '$state', 'Vacation', function($scope, $state, Vacation){

    Vacation.showVacation($state.params.vacationId)
    .then(function(response) {
      $scope.vacation = response.data.vacation;
    });


    $scope.submit = function(flights) {
      console.log('flights equals:', flights);
      Vacation.showFlights(flights)
      .then(function(response) {
        console.log('Flights Response is:', response);
      });
    };

}]);
