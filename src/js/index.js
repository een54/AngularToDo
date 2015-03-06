(function() {
		
	var app = angular.module('todoApp', ['firebase'])
		.controller('TodoController', ['$scope', '$firebase', function($scope, $firebase) {
			
			/**********************************************************
			*
			*	Initial set up
			*
			***********************************************************/
			var fBase = new Firebase("https://glowing-torch-7243.firebaseio.com");				
			var sync = $firebase(fBase);
			var arrTest = sync.$asArray();
			$scope.todos = [];
			$scope.oldTodos = [];
			$scope.todosArchived = false;

			/**********************************************************
			*
			*	Handle adding new todos
			*
			***********************************************************/							
			// TODO: Add animation when the todo is added to make it slide in
			$scope.addTodo = function() { 
				// Ensure the text trying to be entered actually has something in it!
				if ($scope.todoText === '' || $scope.todoText == null) {
					console.log("impty");
					alert("Cannot add a blank to do. There'd be nothing to do you plank");
				}
				else {

					fBase.push({
						todoText: $scope.todoText,
						selected: false,
						done: false,
						archived: false
					});

					// Clear the input field ready to add another entry
					$scope.todoText = '';
				}			
			};

			fBase.on('child_added', function(snapshot) {
				var todo = snapshot.val();
				todo.archived ? $scope.oldTodos.push(todo) : $scope.todos.push(todo);
			});

			/**********************************************************
			*
			*	Handle completing todos
			*
			***********************************************************/							
			$scope.doneClick = function(todo) {
				todo.done = !todo.done;
			};

			
			/**********************************************************
			*
			*	Archiving functions
			*
			***********************************************************/
			// TODO: Add animation when the todo is archived
			// 		to make it slide out
			$scope.archive = function() {
				var currentTodos = $scope.todos;
				$scope.todos = [];
				angular.forEach(currentTodos, function(todo) { 
					// if the todo hasnt been selected
					if (!todo.selected) {						
						todo.archived = false;
						$scope.todos.push(todo);						
					}
					// otherwise archive the todo
					else {
						console.log(todo);
						todo.archived = true;
						todo.selected = false;
						$scope.oldTodos.push(todo);
					}
				});
			};

			$scope.unarchive = function() {
				var currentTodos = $scope.oldTodos;
				$scope.oldTodos = [];
				angular.forEach(currentTodos, function(todo) { 
					if (!todo.selected) {						
						$scope.oldTodos.push(todo);
					}
					else {
						todo.archived = false;
						todo.selected = false;
						$scope.todos.push(todo);
					}
				});
			};
			
			/**********************************************************
			*
			*	Display information functions
			*
			***********************************************************/
			// Display the amount of todos that are not marked as completed
			$scope.remaining = function() {
				var count = 0;
				// For each todo in the list, only increment the 
				// remaining count if the todo is not completed yet.
				angular.forEach($scope.todos, function(todo) {
					count += todo.done ? 0 : 1;
				});
				return count;
			};

			// Display the amount of todos that are selected
			$scope.selected = function() {
				var count = 0;
				// For each todo in the list, only increment the 
				// remaining count if the todo is not completed yet.
				angular.forEach($scope.todos, function(todo) {
					count += todo.selected ? 1 : 0;
				});
				return count;
			};

			// Display the amount of archived todos that are not marked as completed
			$scope.archivedSelected = function() {
				var count = 0;
				// For each todo in the list, only increment the 
				// selected count if the todo is selected.
				angular.forEach($scope.oldTodos, function(todo) {
					count += todo.selected ? 1 : 0;
				});
				return count;
			};
		}]);

		app.directive('nop', function(){
    		return {
        		link: function(scope, elm){     
        			if(scope.todosArchived) {   
            			$(elm).animate('left', '+200px', 2000);
            			scope.todosArchived = !scope.todosArchived;
            		}
        		}
    		}
		});
})();