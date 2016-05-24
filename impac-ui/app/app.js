'use strict';

// Declare app level module which depends on views, and components
angular.module('impacApp', [
  'ngRoute',
  'impacApp.home',
  'impacApp.salesflow',
  'impacApp.employeelocations'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
