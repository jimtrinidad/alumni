'use strict';

/**
* This is the main app.
*/
var app = angular.module('app', ['ngRoute', 'LazyLoad', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngResource']);

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
						'app/alumni/controllers',
						'app/alumni/services',
						'app/program/services'
					]);
				}
			}
		})
		.when('/programs', {

		})
		.when('/users', {

		})
		.when('/settings/general', {
		})
		.when('/settings/notifications', {
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