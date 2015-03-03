var app = angular.module('todoApp', [])
	.controller('TodoController', ['$scope', function($scope) {
		// Initially have nothing in the list
		$scope.todos = [];
		
		$scope.addTodo = function() { 
			// Ensure the text trying to be entered actually has something in it!
			if ($scope.todoText === '' || $scope.todoText == null) {
				console.log("impty");
				alert("Cannot add a blank to do. There'd be nothing to do you plank");
			}
			else {
				// Add another element to the todos array
				$scope.todos.push({todoText:$scope.todoText, done: false});
				// Clear the input field ready to add another entry
				$scope.todoText = '';
			}			
		};

		$scope.remaining = function() {
			var count = 0;
			// For each todo in the list, only increment the 
			// remaining count if the todo is not completed yet.
			angular.forEach($scope.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		$scope.archive = function() {
			var oldTodos = $scope.todos;
			$scope.todos = [];
			angular.forEach(oldTodos, function(todo) { 
				if (!todo.done) {
					$scope.todos.push(todo);
				}
			});
		};
	}]);