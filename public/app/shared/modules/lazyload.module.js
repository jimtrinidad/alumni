(function(){
	'use strict';
	var components;
	angular.module('LazyLoad', [])
	.config([
		'$routeProvider',
	    '$controllerProvider',
	    '$compileProvider',
	    '$filterProvider',
		'$provide', 
		function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
			components = {
				route 		: $routeProvider.register,
				controller 	: $controllerProvider.register,
				compilte	: $compileProvider.register,
				filter 		: $filterProvider.register,
				provide 	: $provide
			};
		}
	])
	.factory('lazy', function (){
		var $injector 	= angular.injector(['ng']);
		var $rootScope 	= $injector.get('$rootScope');
		var $q 			= $injector.get('$q');

		return function(moduleName){
			var mod = angular.module(moduleName);
			mod.components = mod.components || components;
			return {
				load: function (arr){
					arr = arr || [];
					var deferred = $q.defer();
					require(arr, function () {
						$rootScope.$apply(function (){deferred.resolve();});
					});
					return deferred.promise;
				}
			};
		}
	});
})();