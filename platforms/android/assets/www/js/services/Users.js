angular.module('someklone.services').factory('Users', function($q, $http, appConfig) {

  var activeUser = null;
  var users = [];

  $http.get(appConfig.apiAddr + "users").then(function(res) {
    users = res.data;
  });

  return {
    login: function(username, password) {
      return $q(function(resolve, reject) {
        $http.post(appConfig.apiAddr + "login", {
          username: username,
          password: password
        }).then(function(result) {
          if (result.status == 200) {
            activeUser = result.data;
            resolve();
          } else {
            reject();
          }
        }).catch(function() {
          reject();
        });
      });
    },
    isLogged: function() {
      return $q(function(resolve, reject) {
        if (activeUser != null) {
          resolve();
        } else {
          reject();
        }
      });
    },
    signUp: function(username, password) {
      return $q(function(resolve, reject) {
        $http.post(appConfig.apiAddr + "adduser", {
          username: username,
          password: password
        }).then(function(result) {
          if (result.status == 200) {
            activeUser = result.data;
            resolve();
          } else {
            reject();
          }
        }).catch(function() {
          reject();
        });
      });
    },
    searchUser: function(searchWord) {

      var upperCaseSearchWord = searchWord.toUpperCase();
      return $q(function(resolve, reject) {
        if (searchWord.length > 0) {
          var matches = users.filter(function(u) {
            var testString = u.username.toUpperCase();
            return testString.includes(upperCaseSearchWord);
          });

          resolve(matches);
        } else {
          reject();
        }
      });
    },

    getOne: function(key) {
      return $q(function(resolve, reject) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].id == key) {
            resolve(users[i]);
          }
        }
        reject();

      });
    },
    getActiveUser: function() {
      return activeUser;
    },
    getActiveUserActivity: function() {
      return activeUser.activity;
    }

  };
})
