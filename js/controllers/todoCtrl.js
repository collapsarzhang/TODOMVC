/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebase, FIREBASE_URL, Auth) {
	var fireRef = new Firebase(FIREBASE_URL + Auth.getCurrent());
    $scope.todos = $firebase(fireRef).$asArray();

	$scope.$watch('todos', function () {
		var total = 0;
		var remaining = 0;
        angular.forEach($scope.todos, function (todo) {
			// Skip invalid entries so they don't break the entire app.
			if (!todo || !todo.title) {
				return;
			}

			total++;
			if (todo.completed === false) {
				remaining++;
			}
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.completedCount = total - remaining;
		$scope.allChecked = remaining === 0;
	}, true);


	$scope.addTodo = function () {
        if (Auth.signedIn()) {
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }

            $scope.todos.$add({
                title: newTodo,
                completed: false
            });
            $scope.newTodo = '';
        }
	};

	$scope.editTodo = function (todo) {
        if (Auth.signedIn()) {
            $scope.editedTodo = todo;
            $scope.originalTodo = angular.extend({}, $scope.editedTodo);
        }
	};

	$scope.doneEditing = function (todo) {
        if (Auth.signedIn()) {
            $scope.editedTodo = null;
            var title = todo.title.trim();
            if (title) {
                $scope.todos.$save(todo);
            } else {
                $scope.removeTodo(todo);
            }
        }
	};

	$scope.revertEditing = function (todo) {
        if (Auth.signedIn()) {
            todo = $scope.originalTodo;
            $scope.doneEditing(todo);
        }
	};

	$scope.removeTodo = function (todo) {
        if (Auth.signedIn()) {
            $scope.todos.$remove(todo);
        }
	};

	$scope.toggleCompleted = function (todo) {
        if (Auth.signedIn()) {
            todo.completed = !todo.completed;
            $scope.todos.$save(todo);
        }
	};

	$scope.clearCompletedTodos = function () {
        if (Auth.signedIn()) {
            angular.forEach($scope.todos, function (todo) {
                if (todo.completed) {
                    $scope.todos.$remove(todo);
                }
            });
        }
	};

	$scope.markAll = function (allCompleted) {
        if (Auth.signedIn()) {
            angular.forEach($scope.todos, function (todo) {
                todo.completed = !allCompleted;
                $scope.todos.$save(todo);
            });
        }
	};

	$scope.newTodo = '';
	$scope.editedTodo = null;

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;


});
