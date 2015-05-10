/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var net = require('net');

var HOST = '';
var PORT = 8000;
var interval = 1000;

net.createServer(function(sock) {
		var login = false;
	    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

	    sock.on('data', function(data) {
	        var d = JSON.parse(data);

	    var start = function()
	    {
		    var monitor = setInterval(function(){
		    	if (login)
		    	{	
		        	var now = new Date();
		        	sock.write(sock.serial);
		        	if ((now.getTime() - sock.timestamp.getTime()) > (interval*3))
		        	{
		        		console.log("Alert!",now.getTime() - sock.timestamp.getTime());
		        		Gateway.publishCreate({id:-1,serial:sock.serial, time: (now.getTime() - sock.timestamp.getTime())});
		        		clearInterval(monitor);
		        	}
		        }
		    }, interval);
		};

	        if (!login)
	        {
	        		console.log('DATA ' + sock.remoteAddress + ': ' + data);
	        		sock.serial = d.serial;
	        		sock.timestamp = new Date();
	        		login = true;
	        		start();
	        }
	        else
	        {
	        		sock.timestamp = new Date();
	        }
	    
	    });
	    

	    sock.on('error', function(data) {
	        console.log('ERROR:',sock.serial);
	    });

	    sock.on('close', function(data) {
	        console.log('CLOSED:',sock.serial);
	    });
	    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
