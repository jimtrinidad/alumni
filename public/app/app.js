'use strict';

/**
* This is the main app.
*/
var app = angular.module('app', ['ngRoute', 'LazyLoad', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate']);

app.config(['$routeProvider', 'lazyProvider', function ($routeProvider, lazyProvider) {

	var $lazy = lazyProvider.$get();
	$routeProvider
		.when('/', {
			templateUrl: 'app/dashboard/views/main.html'
		})
		.when('/alumni', {
			templateUrl: 'app/alumni/views/main.html',
			resolve: {
				load: function (){
					return $lazy('app').load([
						'app/alumni/controllers/AlumniController',
						'app/alumni/services/alumniService'
					]);
				}
			}
		})
		.when('/programs', {

		})
		.when('/settings/notifications', {
		})
		.when('/settings/displayed', {
		})
		.when('/settings/security', {
		})

		.otherwise({ redirectTo: '/' });
	
}]);


/**
* Disable RequestJS  cache while on development
*/
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});