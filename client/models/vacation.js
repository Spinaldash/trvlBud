'use strict';

angular.module('angular-prototype')
  .factory('Vacation', ['$http', function($http){

    function create(vacation) {
      return $http.post('/vacations', vacation);
    }

    function showVacation(vacationId) {
      return $http.get('/vacations/' + vacationId);
    }

    function listVacations() {
      return $http.get('/vacations');
    }

    function showFlights(vacationId) {
      return $http.get('/flights/' + vacationId);
    }

    return{
      create:create,
      showVacation:showVacation,
      listVacations:listVacations,
      showFlights:showFlights
    };
  }]);
