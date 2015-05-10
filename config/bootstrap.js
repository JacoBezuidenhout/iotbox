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

io.on('connection', function (socket) {
  console.log("connection made");
  var login = false;
  var pinging = false;
  socket.on('login', function (msg) {
    console.log('Gateway', msg.serial, "logged in.");
    socket.gateway = msg;
    socket.gateway.lastHeartbeat = new Date();
    socket.emit('login',{success: true, interval: 1000});
    login = true;
    Gateway.publishCreate({id: -1, serial: socket.gateway.serial, message: 'Gateway ' + socket.gateway.serial + ' connected.', class: 'success'});
    ping();
  });

  socket.on('ping', function (from, msg) {
    console.log('I received a ping back from', socket.gateway.serial);
    socket.gateway.lastHeartbeat = new Date();
    if (!pinging) ping();
  });

  var ping = function()
  {
  	if (login)
  	{
	  	var now = new Date();
	  	var diff = now.getTime() - socket.gateway.lastHeartbeat.getTime();
	  	if (diff > interval*3)
	  	{
	  		console.log('ALERT! No pingback');
	  		Gateway.publishCreate({id: -2, serial: socket.gateway.serial, message: 'Warning! Gateway ' + socket.gateway.serial + ' missed ping.', time: diff, class: 'warning'});
	  	}
	  	else
	  	{
	  		socket.emit('ping',0);
	  		pinging = true;
	  		console.log('Timeout: ', (interval*5)-diff);
	  		setTimeout(ping, Math.max(1000,(interval*3)-diff));
	  	}
  	}
  }

  socket.on('disconnect', function () {
  	if (login)
  		Gateway.publishCreate({id: -2, serial: socket.gateway.serial, message: 'Alert! Gateway ' + socket.gateway.serial + ' missed ping.', class: 'danger'});
    console.log('user disconnected');
  });
});

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  cb();
};
