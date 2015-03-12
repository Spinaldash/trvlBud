'use strict';

angular.module('angular-prototype')
  .controller('VacationsListCtrl', ['$scope', '$rootScope', '$state', 'Vacation', function($scope, $rootScope, $state, Vacation){
    Vacation.listVacations()
    .then(function(response) {
      $scope.vacations = response.data.vacations;
    });

    $scope.submit = function(vacationId) {
      $state.go('vacations.show', {vacationId:vacationId});
    };


}]);
