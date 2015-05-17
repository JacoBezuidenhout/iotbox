/**
 * HeartbeatController
 *
 * @description :: Server-side logic for managing heartbeats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var io = require('socket.io')(5000);
var checksum = require('checksum');
var interval = 1000;
var clients = {};

// io.set('heartbeat interval', 10);
// io.set('heartbeat timeout', 35);
io.on('connection', function (socket) 
{
  console.log("New Connection Made");
  var login = false;
  var pinging = 0;

  var getStatus = function(line,cb)
  {
    // Node.findOne({serial: line.node},function(err,node){
    //   console.log(err,node);
    //   if (line.value > node.settings.safe.min && line.value < node.settings.safe.max)
        cb('success');
    //   else
    //     cb('danger');
    // });
  }

  socket.on('login', function (msg) 
  {
    console.log('Logging In...', msg, Datapoint.socket);
    Gateway.findOrCreate({serial: msg.serial}, msg).exec(function createFindCB(err,gateway)
    {
      console.log('Gateway', gateway, "logged in.");

      gateway.serial = gateway.serial || ('Gateway'+gateway.id);
      gateway.lastConnect = new Date();
      gateway.save();

      login = true;

      gateway.success = 'success';
      gateway.interval = interval;
      
      socket.emit('login',gateway);
      
      socket.gateway = gateway;
      var client = {};
      clients[gateway.id] = socket;
      socket.gateway.lastHeartbeat = new Date();

      var message = {body: "Gateway " + socket.gateway.serial + " logged in.", class: "success"};
      var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "success"};
      Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});

      ping(); 
    });
  });

  socket.on('data', function (msg) 
  {
    cs = checksum(JSON.stringify(msg));
    socket.emit('data',cs);
    msg.gateway = socket.gateway.serial;
    socket.gateway.lastHeartbeat = new Date();
    Node.findOrCreate({serial:msg.node},{serial: msg.node, type: msg.type}).exec(function createFindCB(err,node){
      var now = new Date();
      var then = new Date(node.createdAt);
      var diff = now.getTime() - then.getTime();
      if (diff < 2000)
        Node.publishCreate({id: -1, data: node});
      getStatus(msg,function(status){
        msg.status = status;
        Datapoint.create(msg).exec(function createCB(err,created){
          // console.log('Datapoint created',created,cs);
          Datapoint.publishCreate(created);
        });
      });
    });
  });

  socket.on('ping', function (msg) {
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
  	var now = new Date();
  	var diff = now.getTime() - socket.gateway.lastHeartbeat.getTime();
  	if (diff > interval*5)
  	{
  		    console.log('ALERT! No pingback');
  
  		    var message = {body: "Gateway " + socket.gateway.serial + " did not ping back.", class: "warning"};
          var gateway = {serial: socket.gateway.serial, type: socket.gateway.type, class: "warning"};
          Heartbeat.publishCreate({id: -1, message: message, gateway: gateway});
  
          socket.emit('ping',pinging);
          pinging = 0;
  	}
  	else
  	{
      socket.emit('ping',pinging);
      setTimeout(ping, Math.max(1000,(interval*5)-diff));
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

module.exports = {
  sendSettings : function(req,res)
  {
    var params = req.params.all();
    console.log("settings",clients);
    clients[params.gateway].emit('settings',params.node);
    res.json({success:true});
  },
  sendCommand : function(req,res)
	{
		var params = req.params.all();
    console.log("settings",clients);
		clients[params.gateway].emit('cmd',params.cmd);
		res.json({success:true});
	}
};

