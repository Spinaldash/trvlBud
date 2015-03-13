'use strict';

angular.module('angular-prototype')
  .factory('User', ['$http', function($http){

    function update(user) {
      return $http.post('/users', user)
    }


    return{
      update:update,
    };
  }]);
