/** 
* @class todoAppWrapper.todoApp
* @memberOf todoAppWrapper
*/

/** 
*
*	Define the todoApp module and specify the dependencies.
*
**/
(function() {
	'use strict';
	angular.module('todoApp', ['todoAppEventList','firebase', 'ngAnimate']);	
})();