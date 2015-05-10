'use strict';

/**
 * @ngdoc function
 * @name iotboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iotboxApp
 */
angular.module('iotboxApp')
  .controller('MainCtrl', function ($scope, $sails) {
    $scope.awesomeThings = [ 
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.gateways = [];

    	$sails.get("/gateway")
      	.success(function (data, status, headers, jwr) {
    		$scope.gateways.forEach(function(gateway){
		    	gateway.nodes.forEach(function(node){
					node.modules = getModules(node.serial);
				});
			});
        	$scope.gateways = data;
      	})
      	.error(function (data, status, headers, jwr) {
       		alert('Houston, we got a problem!');
      	});

      	 $sails.on("gateway", function (message) {
      	 		console.log(message);
      	 });
  });
