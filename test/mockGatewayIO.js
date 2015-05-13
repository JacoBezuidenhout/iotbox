// mockGatewayIO.js

var fs = require('fs');
var settings_filename = './settings.json';
var settings = require(settings_filename);

// var socket = require('socket.io-client')('http://api.iotbox.work');
var socket = require('socket.io-client')('http://localhost:5000');
var run;
console.log("Connecting...");

socket.on('connect', function(){
	console.log("Connection Successful");
	socket.emit('login',settings);
});

socket.on('login', function(data)
{
	// console.log(data);
	fs.writeFile(settings_filename, JSON.stringify(data, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + settings_filename);
		    var serial = 'Node'+Math.trunc(Math.random()*1024000);
		    var run2 = setInterval(function()
		    {  
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      socket.emit('data',{node: serial, type: 'XBee868LP', module: ['TEMP','HUMIDITY','BATTERY','LIGHT'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		    },10);
	    }
	});

	run = setInterval(function(){
		socket.emit('ping',1);
	},data.interval);
});

socket.on('ping', function(data){
	socket.emit('ping',1);
	// console.log('Ping Back');
});

socket.on('settings', function(data){
	settings = data;
});


socket.on('disconnect', function(){
	// clearInterval(run);
	// clearInterval(run2);
});