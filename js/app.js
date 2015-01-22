/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['firebase', 'ngRoute']);

todomvc.constant('FIREBASE_URL', 'https://brilliant-inferno-2120.firebaseio.com/');

todomvc.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/todos.html',
            controller: 'TodoCtrl'
        })
        .when('/active', {
            templateUrl: 'views/todos.html',
            controller: 'TodoCtrl'
        })
        .when('/completed', {
            templateUrl: 'views/todos.html',
            controller: 'TodoCtrl'
        })
        .when('/', {
            templateUrl: 'views/todos.html',
            controller: 'TodoCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        })
        .when('/users/:username', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
});

todomvc.filter('todoFilter', function ($location) {
	return function (input) {
		var filtered = {};
		angular.forEach(input, function (todo, id) {
			var path = $location.path();
			if (path === '/active') {
				if (!todo.completed) {
					filtered[id] = todo;
				}
			} else if (path === '/completed') {
				if (todo.completed) {
					filtered[id] = todo;
				}
			} else {
				filtered[id] = todo;
			}
		});
		return filtered;
	};
});
