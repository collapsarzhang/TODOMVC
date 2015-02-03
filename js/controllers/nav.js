'use strict';

todomvc.controller('NavCtrl', function ($scope, $location, Auth, $idle) {
    $scope.logout = function () {
        Auth.logout();
    };

    $scope.$on('$idleStart', function() {
        console.log('idle started');
    });

    $scope.$on('$idleEnd', function() {
        console.log('idle ended');
    });

    $scope.$on('$idleTimeout', function() {
        console.log('idle timeout');
        Auth.logout();
    });

});