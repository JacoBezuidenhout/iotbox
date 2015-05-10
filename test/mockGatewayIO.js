// mockGatewayIO.j
var socket = require('socket.io-client')('http://localhost:5000');

var settings = {};

socket.on('connect', function(){
	console.log("Connection Successful");
	socket.emit('login',{serial: 'EDISON0123'});
});

socket.on('ping', function(data){
	socket.emit('ping',1);
	console.log('Ping Back');
});

socket.on('settings', function(data){
	settings = data;
});

var asdf = setInterval((function(){
	socket.emit('data',{name: "test"});
}), 2000);

socket.on('disconnect', function(){
	clearInterval(asdf);
});