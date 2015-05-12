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
// note, io(<port>) will create a http server for you
var io = require('socket.io')(5000);
var interval = 1000;
// io.set('heartbeat interval', 10);
// io.set('heartbeat timeout', 35);

io.on('connection', function (socket) {
  console.log("connection made");
  var login = false;
  var pinging = 0;
  var gotPing = false;

  socket.on('login', function (msg) {
    console.log('Gateway', msg.serial, "logged in.");
    socket.gateway = msg;
    socket.gateway.lastHeartbeat = new Date();
    socket.emit('login',{success: true, interval: 1000});
    login = true;

    var message = {body: "Gateway " + socket.gateway.serial + " logged in.", class: "success"};
    var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "success"};
    Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});

    ping();
  });

  socket.on('ping', function (from, msg) {
    // console.log('I received a ping back from', socket.gateway.serial);
    socket.gateway.lastHeartbeat = new Date();
    if (pinging == 0) 
    {
      var message = {body: "Gateway " + socket.gateway.serial + " started to ping back.", class: "info"};
      var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "info"};
      Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});
      ping();
    }

    if (pinging == 10) 
    {
      var message = {body: "Gateway " + socket.gateway.serial + " is running well.", class: "success"};
      var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "success"};
      Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});
    }

    pinging++;    

  });

  var ping = function()
  {
  	if (login)
  	{
	  	var now = new Date();
	  	var diff = now.getTime() - socket.gateway.lastHeartbeat.getTime();
	  	if (diff > interval*5)
	  	{
	  		    console.log('ALERT! No pingback');
	  		    var message = {body: "Gateway " + socket.gateway.serial + " did not ping back.", class: "warning"};
            var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "warning"};
            Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});
            socket.emit('ping',0);
            pinging = 0;
	  	}
	  	else
	  	{
	  		socket.emit('ping',0);
	  		// console.log('Timeout: ', (interval*5)-diff);
	  		setTimeout(ping, Math.max(1000,(interval*5)-diff));
	  	}
  	}
  }

  socket.on('disconnect', function () {
  	if (login)
    {     
      setTimeout(function()
      {
        var message = {body: "Gateway " + socket.gateway.serial + " disconnected.", class: "danger"};
        var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "danger"};
        Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});
      },(interval*5) + 1000);
    }
    console.log('user disconnected');
  });
});

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  cb();
};
