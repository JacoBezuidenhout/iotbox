// app.js
angular
  .module('iotboxApp', [
    'ngRoute',
    'ngAnimate',
    'ngSails',
    'angular-dimple'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })      
      .when('/heartbeat', {
        templateUrl: 'views/heartbeat.html',
        controller: 'HeartbeatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });