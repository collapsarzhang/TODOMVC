'use strict';

todomvc.factory('Auth',
    function (FIREBASE_URL, $rootScope, $firebaseAuth, $location) {
        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        var Auth = {
            register: function (user) {
                return authObj.$createUser(user);
            },
            signedIn: function () {
                return authObj.$getAuth();
            },
            login: function (user) {
                return authObj.$authWithPassword(user);
            },
            logout: function () {
                authObj.$unauth();
            }
        };

        authObj.$onAuth(function(authData) {
            if (authData) {
                $location.path('/');
            } else {
                $location.path('/');
            }
        });

        $rootScope.signedIn = function () {
            return Auth.signedIn();
        };

        return Auth;
    });
