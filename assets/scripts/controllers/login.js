'use strict';

/**
 * @ngdoc function
 * @name iotboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iotboxApp
 */
angular.module('iotboxApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $window, $sails) {
    
  	$scope.sendLogin = function(){
  		$sails.post("/auth/local",$scope.user)
	      	.success(function (data, status, headers, jwr) {
		    	if (data.email)
		    	$scope.login = true;
	      	})
	      	.error(function (data, status, headers, jwr) {
	       		// alert('Houston, we got a problem!');
	      	});
  	};
  	$scope.register = function(){
  		$sails.post("/auth/local/register",$scope.registerData)
	      	.success(function (data, status, headers, jwr) {
		    	if (data.email)
		    	$scope.login = true;
	      	})
	      	.error(function (data, status, headers, jwr) {
	       		// alert('Houston, we got a problem!');
	      	});
  	};

  });
