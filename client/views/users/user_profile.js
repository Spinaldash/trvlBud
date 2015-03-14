'use strict';

angular.module('angular-prototype')
  .controller('ProfileCtrl', ['$rootScope', '$scope', '$state', 'User', '$window', function($rootScope, $scope, $state, User, $window){

  $scope.update = function(user){
   User.update(user)
   .then(function(response){
     $window.localStorage.user = JSON.stringify(response.data.user);
     $rootScope.user = response.data.user;
     $state.go('home');
   })
 }

}]);
