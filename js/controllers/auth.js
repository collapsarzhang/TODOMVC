'use strict';

todomvc.controller('AuthCtrl',
    function ($scope, $location, Auth) {

        $scope.login = function () {
            Auth.login($scope.user).then(function(authData) {
                // console.log("Logged in as:", authData.uid);
                // do whatever you want if successfully login
            }).catch(function(error) {
                // console.error("Authentication failed:", error);
                $scope.error = error.toString();
            });
        };

        $scope.register = function () {
            Auth.register($scope.user).then(function(userData) {
                // console.log("User " + userData.uid + " created successfully!");
                return Auth.login($scope.user);
            }).then(function(authData) {
                // console.log("Logged in as:", authData.uid);
                // do whatever you want if successfully register and login
            }).catch(function(error) {
                // console.error("Error: ", error);
                $scope.error = error.toString();
            });
        };

    }
);