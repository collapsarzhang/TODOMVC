'use strict';

todomvc.controller('AuthCtrl',
    function ($scope, $location, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);

        if (ref.getAuth()) {
            $location.path('/');
        }

        $scope.login = function () {
            ref.authWithPassword({
                email    : $scope.user.email,
                password : $scope.user.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $scope.$apply(function() {
                        $scope.error = error.toString();
                    });
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.$apply(function() {
                        $location.path("/");
                    });
                }
            });
        };

        $scope.register = function () {
            ref.createUser({
                email    : $scope.user.email,
                password : $scope.user.password
            }, function(error) {
                if (error === null) {
                    console.log("User created successfully");
                    ref.authWithPassword({
                        email    : $scope.user.email,
                        password : $scope.user.password
                    }, function(error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                            $scope.$apply(function() {
                                $scope.error = error.toString();
                            });
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                            $scope.$apply(function() {
                                $location.path("/");
                            });
                        }
                    });
                } else {
                    console.log("Error creating user:", error);
                    $scope.$apply(function() {
                        $scope.error = error.toString();
                    });
                }
            });
        };

    }
);