'use strict';

todomvc.controller('NavCtrl', function ($rootScope, $scope, $location, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);

    $scope.logout = function () {
        ref.unauth();
    };

    $rootScope.signedIn = function () {
        return ref.getAuth();
    };

});