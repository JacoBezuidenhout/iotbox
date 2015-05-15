'use strict';

/**
 * @ngdoc function
 * @name iotboxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the iotboxApp
 */

angular.module('iotboxApp')
 .controller('DashboardCtrl', function ($scope, $sails) 
{

 	$scope.gateways = [];
    $scope.nodes = [];
    $scope.modules = [];
    $scope.graphData = [];

 	$scope.newCount = 0;

 	$sails.get("/datapoint")
	    .success(function (data, status, headers, jwr) {
	    	// console.log("got datapoints",data);
	    })
	    .error(function (data, status, headers, jwr) {
	    	alert('Houston, we got a problem!');
	    });

    $sails.get("/gateway")
      	.success(function (data, status, headers, jwr) {
    		$scope.gateways = data;
    		// console.log("got gateways")
      	})
      	.error(function (data, status, headers, jwr) {
       		alert('Houston, we got a problem!');
      	});

    // Watching for updates
    $sails.on("gateway", function (message) {
    	// alert(message.data);
    	$scope.gateways.push(message.data);
    });

	$sails.on("datapoint", function (message) {
		if (message.data.node == $scope.currentNode)
		{
			$scope.newCount++;
			console.log(message);
		}
	});

    $scope.drawGraph = function(serial,module)
    {
    	var defaultSettings = {delta: {time: 300, value: 2}, min: -20, max: 65, safe: {min: 15, max: 35}};

		$sails.get("/datapoint/?node=" + serial + "&limit=100&sort=createdAt%20desc")
	    .success(function (data, status, headers, jwr) {
	    	$scope.graphData = data.map(function(obj){ 
			   var rObj = obj;
			   rObj.timestamp = Date.parse(obj.createdAt);
			   return rObj;
			});
			$scope.node = serial;
	    	console.log("got datapoints",$scope.graphData);
	    })
	    .error(function (data, status, headers, jwr) {
	    	alert('Houston, we got a problem!');
	    });
    };

    $scope.getNodes = function(serial)
    {   
    	$scope.newCount = 0;	
    	$scope.graphData = [];	
    	$scope.currentNode = serial;
    	$sails.get("/node/byGateway?serial="+serial)
      	.success(function (data, status, headers, jwr) {
    		$scope.nodes = data;
    		console.log("got nodes",data)
      	})
      	.error(function (data, status, headers, jwr) {
       		alert('Houston, we got a problem!');
      	});
    };
    
});

/* 	$scope.graphdata = [];
    var gateways = [];
    $scope.gateways = [];

  	var getModules = function(serial) {
		var defaultSettings = {delta: {time: 300, value: 2}, min: -20, max: 65, safe: {min: 15, max: 35}};
		
		var arr = [ 'Car', 'Car', 'Truck', 'Boat', 'Truck' ];
		var hist = {};
		arr.map( function (a) { if (a in hist) hist[a.type] ++; else hist[a] = 1; } );
		console.log(hist);

		return [];
	};
  	var getDataset = function(node,module) {
		return [];
	};

	$scope.loadNode = function(node,gateway) {
		$scope.data = node;
		$scope.data.gateway = gateway;
		var data = [];

		node.modules.forEach(function(module){
	        data = data.concat(getDataset(node,module));
	    });

		$scope.graphdata = data;
	};	

	$scope.back = function() {
		$scope.data.gateway = '';
	};

	$scope.drawGraph = function(node,module) {
		var data = getDataset(node,module);
		$scope.graphdata = data;
	};

	    // $scope.gateways = [
    // 	{serial: 'EDISON0123', type:'EDISON1.0', nodes:[{serial:'cdf', icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'d1a', icon: 'XB8LP.png', type:'XB8LP'}]},
    // 	{serial: 'EDISON4567', type:'EDISON1.0', nodes:[{serial:'cf0', icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'d2e', icon: 'XB8LP.png', type:'XB8LP'}]}
    // ];

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

    // Watching for updates
    $sails.on("gateway", function (message) {

    	console.log(message);

    	if (message.verb == "created") 
    	{
        	$sails.get("/gateway")
		      	.success(function (data, status, headers, jwr) {
		        	$scope.gateways = data;
		        	$scope.gateways.forEach(function(gateway){
					    gateway.nodes.forEach(function(node){
							node.modules = getModules(node.serial);
						});
					});
		      	})
		      	.error(function (data, status, headers, jwr) {
		        	alert('Houston, we got a problem!');
		      	});
       	}
       	if (message.verb == "updated") 
    	{
			$sails.get("/gateway")
		      	.success(function (data, status, headers, jwr) {
		        	$scope.gateways = data;
		        	$scope.gateways.forEach(function(gateway){
					    gateway.nodes.forEach(function(node){
							node.modules = getModules(node.serial);
						});
					});
		      	})
		      	.error(function (data, status, headers, jwr) {
		        	alert('Houston, we got a problem!');
		      	});
		    
		}
       	if (message.verb == "addedTo") 
    	{
			$sails.get("/gateway")
		      	.success(function (data, status, headers, jwr) {
		        	$scope.gateways = data;
		        	$scope.gateways.forEach(function(gateway){
					    gateway.nodes.forEach(function(node){
							node.modules = getModules(node.serial);
						});
					});
		      	})
		      	.error(function (data, status, headers, jwr) {
		        	alert('Houston, we got a problem!');
		      	});
		    
		}
    });*/