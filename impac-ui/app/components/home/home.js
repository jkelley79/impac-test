(function (angular) {
    'use strict';
    angular.module('impacApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeCtrl'
      });
    }])

    .controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.employeeloading = true;
        $scope.salesloading = true;

        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/employeelocations'
        }).then(function successCallback(response) {
          if (response.data.status) {
            $scope.employeePoints = response.data.points;
            $scope.employeeloading = false;
          } else {
            $scope.employeeloading = false;
            $scope.employeefailed = true;
          }
        }, function errorCallback(response) {
          $scope.employeeloading = false;
          $scope.employeefailed = true;
        });

        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/salesflow'
        }).then(function successCallback(response) {
          if (response.data.status) {
            $scope.salesPoints = response.data.points;
            $scope.salesloading = false;
          } else {
            $scope.salesloading = false;
            $scope.salesfailed = true;
          }
        }, function errorCallback(response) {
          $scope.salesloading = false;
          $scope.salesfailed = true;
        });

    }]);
}(angular));
