(function() {
		
	var app = angular.module('todoApp', ['firebase', 'ngAnimate'])
		.controller('TodoController', ['$scope', '$firebase', function($scope, $firebase) {
			
			/**********************************************************
			*
			*	Initial set up
			*
			***********************************************************/
			var fBase = new Firebase("https://glowing-torch-7243.firebaseio.com");				
			var sync = $firebase(fBase);						
			$scope.data = sync.$asArray();			

			/**********************************************************
			*
			*	Handle adding new todos
			*
			***********************************************************/										
			$scope.addTodo = function() { 
				// Ensure the text trying to be entered actually has something in it!
				if ($scope.todoText === '' || $scope.todoText == null) {					
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
			$scope.archive = function(id) {				
				var obj = $scope.data.$getRecord(id);				
				obj.archived = !obj.archived;
				obj.selected = false;
				$scope.data.$save(obj);
			};
			
			/**********************************************************
			*
			*	Display information functions
			*
			***********************************************************/
			// Display the amount of todos that are not marked as completed
			$scope.remaining = function() {
				return $scope.data.filter(function(todo) {
					return !todo.done && !todo.archived;
				}).length;		
			};

			// Display the amount of todos that are not marked as completed
			$scope.remainingArchived = function() {
				return $scope.data.filter(function(todo) {
					return !todo.done && todo.archived;
				}).length;		
			};

			// Display the amount of standard todos that are selected
			$scope.selected = function() {				
				return $scope.data.filter(function(todo) {
					return todo.selected && !todo.archived;
				}).length;				
			};

			// Display the amount of archived todos that are not marked as completed
			$scope.archivedSelected = function() {
				return $scope.data.filter(function(todo) {
					return todo.selected && todo.archived;
				}).length;		
			};
		}]);
})();