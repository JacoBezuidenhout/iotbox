'use strict';

/**
 * @ngdoc function
 * @name iotboxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the iotboxApp
 */

angular.module('iotboxApp')
 .controller('DashboardCtrl', function ($scope, $sails) {

 	$scope.gateways = [
    	{serial: 'EDISON0123', type:'EDISON1.0', nodes:[{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'cdf'+Math.trunc(Math.random()*1000), icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'d1a', icon: 'XB8LP.png', type:'XB8LP'}]},
    	{serial: 'EDISON4567', type:'EDISON1.0', nodes:[{serial:'cf0', icon: 'XB8LP.png' ,type:'XB8LP'},{serial:'d2e', icon: 'XB8LP.png', type:'XB8LP'}]}
    ];

    $sails.get("/gateway")
      	.success(function (data, status, headers, jwr) {
    		console.log("got gateways")
      	})
      	.error(function (data, status, headers, jwr) {
       		alert('Houston, we got a problem!');
      	});

    // Watching for updates
    $sails.on("gateway", function (message) {
    		$scope.message = message.data.serial + " is OFFLINE!!!";
    });

    $scope.nodes = [];
    $scope.modules = [];
    $scope.graphData = [];

    var getModules = function(serial)
    {
    	return [      
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: 25, action: 'CHANGE'},
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: 25, action: 'CHANGE'},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: 25, action: 'CHANGE'},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: 25, action: 'TIMER'}

      		];
    }

    $scope.drawGraph = function(serial,module)
    {
    	var defaultSettings = {delta: {time: 300, value: 2}, min: -20, max: 65, safe: {min: 15, max: 35}};

    	 $scope.graphData = [      
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-05-08T06:33:24.492Z")},
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-05-08T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-05-08T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-04-08T06:33:24.492Z")},
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-04-08T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-04-08T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-03-08T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-03-08T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-03-08T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-08T06:33:24.492Z")},
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-08T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-08T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-10T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-10T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-01-10T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-15T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-15T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-01-15T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-28T06:33:24.492Z")},
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-28T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-01-28T06:33:24.492Z")},
    		
	      	{node: serial, type: 'HUMI1_0', icon: '48x48/rainmeter.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-06-08T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2015-06-08T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2015-06-08T06:33:24.492Z")},
    		
			{node: serial, type: 'TEMP1_0', icon: '48x48/weather.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2016-01-08T06:33:24.492Z")},
	      	{node: serial, type: 'BATE1_0', icon: '48x48/battery.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'CHANGE', timestamp: Date.parse("2016-01-08T06:33:24.492Z")},
	      	{node: serial, type: 'LIGH1_0', icon: '48x48/flashlight app.png' ,value: Math.trunc(Math.random()*defaultSettings.max), action: 'TIMER', timestamp: Date.parse("2016-01-08T06:33:24.492Z")}

      		];

    }

    $scope.getNodes = function(serial)
    {
    	$scope.gateways.map( function (a) { 

    		if (a.serial == serial) 
    		{
    			$scope.nodes = a.nodes; 
    			$scope.nodes.map( function (b) 
    			{
    				b.modules = getModules(b.serial);

    			});
    		}

    	});
    }
    

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