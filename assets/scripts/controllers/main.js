'use strict';

/**
 * @ngdoc function
 * @name iotboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iotboxApp
 */
angular.module('iotboxApp')
  .controller('MainCtrl', function ($scope, $rootScope, $sails) {
    

    $sails.get("/me")
	      	.success(function (data, status, headers, jwr) {
		    	if (data.email)
		    		$scope.login = true;
		    	$scope.user = data;
	      	})
	      	.error(function (data, status, headers, jwr) {
	       		$scope.login = false;
		    	$scope.user = {};
	      	});



  });
