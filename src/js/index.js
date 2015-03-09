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
			*	Adding new todos
			*
			***********************************************************/										
			$scope.addTodo = function() { 
				// Ensure the text trying to be entered actually has something in it!
				if ($scope.todoText === '' || $scope.todoText == null) {					
					alert("Cannot add a blank to do. There'd be nothing to do you plank");
				}
				// else if () {

				// }
				else {
					var created = new Date();
					var target = $("#datepicker-field").val();	
					created = created.getDate() + '/' + (created.getMonth()+1) + '/' + created.getFullYear();

					fBase.push({
						todoText: $scope.todoText,
						selected: false,
						done: false,
						archived: false,
						createdDate: created,
						targetDate: target
					});
					// Clear the input field ready to add another entry
					$scope.todoText = '';
				}			
			};			
			/**********************************************************
			*
			*	Completing todos
			*
			***********************************************************/							
			$scope.doneClick = function(id) {				
				var obj = $scope.data.$getRecord(id);		
				if(obj.archived){
					obj.done = !obj.done;
					$scope.data.$save(obj);
				}							
				else {						
					$('#leeSinAttack')[0].play(); // Play the audio clip for Lee Sin	
					$('#leeSin').animate(
						{left: "45%"}, 					
						1000, 
						// After the animation completes, update the todo which also updates the running totals.
						// 	then put Lee Sin back in the brush
						function() {
							obj.done = !obj.done;	
							$('#leeSin').toggle();
							$('#leeSin').css('left','-200px');
							$('#leeSin').toggle();		
							$scope.data.$save(obj);										
						}
					);	
				}		
			};
			/**********************************************************
			*
			*	Archiving
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