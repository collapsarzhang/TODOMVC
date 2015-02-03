/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebase, FIREBASE_URL, Auth, $idle) {
	var fireRef = new Firebase(FIREBASE_URL + Auth.getCurrent());

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

	$scope.editTodo = function (id) {
        if (Auth.signedIn()) {
            var index = $scope.todos.$indexFor(id);
            $scope.editedTodo = $scope.todos[index];
            $scope.originalTodo = angular.extend({}, $scope.editedTodo);

        }
	};

	$scope.doneEditing = function (id) {
        if (Auth.signedIn()) {
            var index = $scope.todos.$indexFor(id);
            var title = $scope.todos[index].title.trim();
            console.log(title);
            if (title) {
                $scope.todos.$save(index);
            } else {
                $scope.removeTodo(id);
            }
        }
	};

	$scope.revertEditing = function (id) {
        if (Auth.signedIn()) {
            var index = $scope.todos.$indexFor(id);
            $scope.todos[index].title = $scope.originalTodo.title;
            $scope.doneEditing(id);
        }
	};

	$scope.removeTodo = function (id) {
        if (Auth.signedIn()) {
            var index = $scope.todos.$indexFor(id);
            $scope.todos.$remove(index);
        }
	};

	$scope.toggleCompleted = function (id) {
        if (Auth.signedIn()) {
            var index = $scope.todos.$indexFor(id);
            $scope.todos[index].completed = !$scope.todos[index].completed;
            $scope.todos.$save(index);
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

    $scope.todos = $firebase(fireRef).$asArray();
});
