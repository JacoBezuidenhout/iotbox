// app.js
angular
  .module('iotboxApp', [
    'ngRoute',
    'ngAnimate',
    'ngSails',
    'angular-dimple',
    'openlayers-directive'
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })      
      .when('/heartbeat', {
        templateUrl: 'views/heartbeat.html',
        controller: 'HeartbeatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });