var net = require('net');

var HOST = '10.0.0.109';
var PORT = 8000;
var interval = 1000;

net.createServer(function(sock) {
    
    var login = false;
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    sock.on('data', function(data) {
        var d = JSON.parse(data);

    var start = function()
    {
	
    	var now = new Date();
    	sock.write(sock.serial);
    	if ((now.getTime() - sock.timestamp.getTime()) > (interval*3))
    	{
    		console.log("Alert!",now.getTime() - sock.timestamp.getTime());
    		Gateway.publishCreate({id:-1,serial:sock.serial, time: (now.getTime() - sock.timestamp.getTime())});
    	}
    	else
    		setTimeout(start, interval);

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
        sock.destroy();
    });

    sock.on('close', function(data) {
        console.log('CLOSED:',sock.serial);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);