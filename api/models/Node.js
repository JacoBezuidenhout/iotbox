/**
* Node.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var defaultSettings = {delta: {time: 300, value: 2}, min: -20, max: 65, safe: {min: 15, max: 35}};

module.exports = {

  connection: 'someMongodbServer',

  attributes: {
    serial: {
      type: 'string',
      unique: true
    },
    type: {
      type: 'string'
    },
  	settings: {
  		type: 'json',
      defaultsTo: defaultSettings
  	}
  }
};

