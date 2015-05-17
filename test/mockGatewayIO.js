// mockGatewayIO.js
   
var fs = require('fs');
var checksum = require('checksum');

var settings_filename = './settings.json';
var settings = require(settings_filename);

var queue = {};

// var socket = require('socket.io-client')('http://api.iotbox.work');
var socket = require('socket.io-client')('http://localhost:5000');
var run;
console.log("Connecting...");

socket.on('connect', function(){
	console.log("Connection Successful");
	socket.emit('login',settings);
});

var send = function(msg)
{
   socket.emit('data',msg);
   queue[checksum(JSON.stringify(msg))] = msg;
   console.log('Added message in queue...',Object.keys(queue).length);
}

socket.on('login', function(data)
{
	fs.writeFile(settings_filename, JSON.stringify(data, null, 4), function(err) 
	{
	    if(err) 
	    {
	      console.log(err);
	    } 
	    else 
	    {
	      	console.log("JSON saved to " + settings_filename);
		    var serial = 'Node' + Math.trunc(Math.random()*1024000);
		    setInterval(function()
		    {  
		      send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*5+25});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		      // send({node: serial, type: 'XBee868LP', module: ['TEMP1_0','HUMI1_0','BATE1_0','LIGH1_0'][Math.trunc(Math.random()*4)], value: Math.random()*50});
		    }, Math.trunc(Math.random()*5000));
	    }
	});

	setInterval(function()
	{
		socket.emit('ping',1);
	}, data.interval);
});

socket.on('ping', function(data){
	socket.emit('ping',1);
});

socket.on('settings', function(data){
	settings = data;
});

socket.on('data', function(data){
	console.log('Removed message from queue...',Object.keys(queue).length);
	delete queue[data];
});


socket.on('disconnect', function(){
	// clearInterval(run);
	// clearInterval(run2);
});