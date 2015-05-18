// test.js

angular.module('iotboxApp')
  .controller('TestCtrl', ['$scope', '$sails', 'authFactory', function ($scope, $sails, authFactory) {
      $scope.user = authFactory.login();
      console.log($scope.user);
    }])
  	.directive('test', function() {
  		return {
	  		scope: {
	      		data: '=data'
			},
	    		templateUrl: 'scripts/modules/directives/test.html'
		};
	})
  	.directive('gateways', function() {
  		return {
  			scope: {
      			gateways: '=data'
    		},
    			templateUrl: 'scripts/modules/directives/gateways.html'
  		};
	})
	.directive('nodes', function() {
  		return {
  			scope: {
      			nodes: '=data'
    		},
    			templateUrl: 'scripts/modules/directives/nodes.html'
  		};
	})
	.directive('node', function() {
  		return {
  			scope: {
      			node: '=data'
    		},
    			templateUrl: 'scripts/modules/directives/node.html'
  		};
	})
	.directive('map', function() {
  		return {
  			scope: {
      			node: '=data'
    		},
    			templateUrl: 'scripts/modules/directives/map.html'
  		};
	});