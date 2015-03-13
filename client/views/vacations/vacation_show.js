'use strict';

angular.module('angular-prototype')
  .controller('VacationsShowCtrl', ['$scope', '$state', 'Vacation', function($scope, $state, Vacation){

    Vacation.showVacation($state.params.vacationId)
    .then(function(response) {
      $scope.vacation = response.data.vacation;
    });

    $scope.$on('flight-purchased', (event, vacation)=>{
      $scope.vacation = vacation;
    });

    $scope.submit = function() {
      Vacation.showFlights($scope.vacation)
      .then(function(response) {
        $scope.flights = response.data.PricedItineraries;
        console.log('flights equals:', $scope.flights);
      });
    };

}]);
