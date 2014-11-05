'use strict';

/**
* This is the main app.
*/
var app = angular.module('app', ['ngRoute', 'LazyLoad']);

app.config(['$routeProvider', 'lazyProvider', function ($routeProvider, lazyProvider) {

	var $lazy = lazyProvider.$get();
	$routeProvider
		.when('/alumni', {
			templateUrl: 'app/alumni/views/main.html',
			resolve: {
				load: function (){
					return $lazy('app').load([
						'app/alumni/controllers/AlumniController',
						'app/alumni/services/AlumniService'
					]);
				}
			}
		})
	
}])