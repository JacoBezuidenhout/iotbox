/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name : {
  		type: 'string'
  	},
  	surname : {
  		type: 'string'
  	},
  	email : {
  		type: 'email'
  	},
  	password : {
  		type: 'password'
  	},
  	gateways : {
  		type: 'array'
  	}
  },
  toJSON : function()
  {
  	var obj = this.toObject();
    delete obj.password;
    return obj;
  }
};

