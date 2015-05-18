angular.module('userModule', ['ngSails'])
.factory('authFactory', ['$sails',function($sails) {
  
    var user = {};

    var login = function(form){
      console.log('Login Called',form);
      user = {name: 'Jaco', email: 'jaco@peoplesoft.co.za'};
      return user;
    };

    var register = function(form){
      console.log('Register Called',form);
      user = {name: 'Jaco', email: 'jaco@peoplesoft.co.za'};
      return user;
    };

    var logout = function(){
      console.log('Logout Called');
      user = {};
    };

    var user = function(){
      console.log(user);
      return user;
    };

  return {
    login: login,
    logout: logout,
    register: register,
    user: user
  };
}]);