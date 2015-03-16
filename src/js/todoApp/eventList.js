
	var app = angular.module('todoAppEventList', []);
	app.directive('archivedEvents', ['filterFilter', function(filterFilter){
		return {
			restrict: 'E',
			controller: 'TodoController',	
			scope: {
				archivetxt: '@',
				archive: '@'
			},		
			link: function(scope) {
				scope.showAttr = function() {
					return filterFilter(scope.data, {archived:scope.archive});
				}
         	},
         	templateUrl: '/html/eventList.html'    		   		
		};
	}]);



