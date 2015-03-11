'use strict';

angular.module('angular-prototype')
  .controller('NavCtrl', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state){
    $scope.logout = function(){
        delete $rootScope.user;
        $window.localStorage.clear();
        $state.go('home');
      };
  }]);
