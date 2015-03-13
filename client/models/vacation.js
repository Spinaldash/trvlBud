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

    function showFlights(vacation) {
      return $http.post('/flights', vacation);
    }

    function purchaseFlight(vacationId, info){
      return $http.post(`/vacations/${vacationId}/flights/purchase`, info)
    }

    return{
      create:create,
      showVacation:showVacation,
      listVacations:listVacations,
      showFlights:showFlights,
      purchaseFlight:purchaseFlight
    };
  }]);
