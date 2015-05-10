/**
 * HeatbeatController
 *
 * @description :: Server-side logic for managing heatbeats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var net = require('net');

var HOST = '10.0.0.109';
var PORT = 8000;
var interval = 1000;

var HEARTBEAT = function()
{

	

}

HEARTBEAT.prototype.alert = function(message) {
	
};

module.exports = HEARTBEAT;

