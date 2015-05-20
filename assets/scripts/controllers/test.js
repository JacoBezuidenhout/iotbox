// test.js
angular.module('iotboxApp')
  .controller('TestCtrl', ['$scope', '$sails', 'authFactory', function ($scope, $sails, authFactory) {
      authFactory.user(function(me){
        $scope.user = me;
        console.log($scope.user);
      });
      
      $sails.get("/gateway")
      .success(function (data, status, headers, jwr) 
      {
        $scope.gateways = data;
      })
      .error(function (data, status, headers, jwr) 
      {
        console.log(data);
      });

      // $scope.gateways = [{id: 1,type: 'IntelEdison'},{id: 2,type: 'IntelEdison'},{id: 3,type: 'IntelEdison'},{id: 4,type: 'IntelEdison'}];
    }])
    .controller('GatewayCtrl', ['$scope', '$sails', 'authFactory', function ($scope, $sails, authFactory) {
     
      $scope.setGateway = function(g)
      {
        $scope.$applyAsync(function() 
        {
          $scope.gateway = g;
          $sails.get("/node/byGateway?serial=" + g.serial)
          .success(function (data, status, headers, jwr) {
            $scope.nodes = data;
            console.log("got nodes",data)
          })
          .error(function (data, status, headers, jwr) {
            // alert('Houston, we got a problem!');
          });
          console.log('setGateway',g);
        });
      };

      $scope.gatewaySave = function()
      {
        console.log('gatewaySave');  
      };

      $scope.nodeSet = function(n)
      {
        $scope.$applyAsync(function() 
        {
          console.log('setNode',n);
          $scope.node = n;
          $sails.get("/node?serial=" + n._id)
          .success(function (data, status, headers, jwr) {
            $scope.node.node = data[0];
            console.log("got nodE",data[0]);
          })
          .error(function (data, status, headers, jwr) {
            // alert('Houston, we got a problem!');
          });
        });
      };

    }])
    .controller('NodeCtrl', ['$scope', '$sails', function ($scope, $sails) {

      $scope.settingAdd = function()
      {
        console.log('settingAdd');
      };

      $scope.nodeSave = function()
      {
        console.log('nodeSave');
      };

      $scope.nodeReset = function()
      {
        console.log('nodeReset');
      };

      $scope.datapointsGet = function(n,m,l)
      {
        console.log('datapointsGet');
        var query = "/datapoint/?node=" + n._id;
        if (m != "")
          query += "&module=" +  m;
        query += "&limit=" +  l + "&sort=createdAt%20desc";
        $scope.$applyAsync(function() 
        {
          $('#collapseTwo').show(200);
          $sails.get(query)
          .success(function (data, status, headers, jwr) {
            $scope.datapoints = data.map(function(obj){ 
             var rObj = obj;
             rObj.timestamp = Date.parse(obj.createdAt);
             return rObj;
          });
            console.log("got datapoints",$scope.graphData);
          })
          .error(function (data, status, headers, jwr) {
            // alert('Houston, we got a problem!');
          });
        });
      };

    }])
  	.directive('gateways', function() {
  		return {
  			scope: {
            gateways: '=data',
      			setGateway: '=fn'
    		},
    			templateUrl: 'scripts/modules/directives/gateways.html'
  		};
  	})
  	.directive('gatewaysettings', function() {
    		return {
    			scope: {
        			gateway: '=data' 
      		},
      			templateUrl: 'scripts/modules/directives/gatewaySettings.html'
    		};
  	})
  	.directive('gatewaysummary', function() {
    		return {
    			scope: {
        			gateway: '=data'
      		},
      			templateUrl: 'scripts/modules/directives/gatewaySummary.html'
    		};
  	})
  	.directive('nodes', function() {
    		return {
    			scope: {
        			nodes: '=data',
              nodeSet: '=fn'
      		},
      			templateUrl: 'scripts/modules/directives/nodes.html'
    		};
  	})
    .directive('nodedetails', function() {
        return {
          scope: {
              node: '=data'
          },
            templateUrl: 'scripts/modules/directives/nodeDetails.html'
        };
    })
    .directive('nodesettings', function() {
        return {
          scope: {
              node: '=data'
          },
            templateUrl: 'scripts/modules/directives/nodeSettings.html'
        };
    })
    .directive('nodesummary', function() {
        return {
          scope: {
              node: '=data'
          },
            templateUrl: 'scripts/modules/directives/nodeSummary.html'
        };
    })
    .directive('datapoints', function() {
        return {
          scope: {
              datapoints: '=data',
              node: '=node',
              datapointsGet: '=fn'
          },
            templateUrl: 'scripts/modules/directives/datapoints.html'
        };
    })
  	.directive('graphs', function() {
    		return {
    			scope: {
              graphData: '=data',
              node: '=node',
        			datapointsGet: '=fn'
      		},
      			templateUrl: 'scripts/modules/directives/graphs.html'
    		};
  	})
  	.directive('map', function() {
    		return {
    			scope: {
        			nodeS: '=data'
      		},
      			templateUrl: 'scripts/modules/directives/map.html'
    		};
  	});