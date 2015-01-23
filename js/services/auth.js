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
            getCurrent: function () {
                return $rootScope.currentUser;
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
                $rootScope.currentUser = authData.uid;
                $location.path('/');
            } else {
                delete $rootScope.currentUser;
                $location.path('/');
            }
        });

        $rootScope.signedIn = function () {
            return Auth.signedIn();
        };

        return Auth;
    });
