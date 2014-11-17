'use strict';

/**
* This is the main app.
*/

//INIT
var permissionList;
var app = angular.module('app', [
			'ngRoute', 
			'LazyLoad', 
			'ui.bootstrap', 
			'angular-loading-bar', 
			'ngAnimate', 
			'ngResource', 
			'blockUI'
		]);

/**
* Page routing
*/
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
			},
			permission: 'admins'
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
		.when('/404', {
			templateUrl: 'app/shared/views/404.html'
		})
		.when('/401', {
			templateUrl: 'app/shared/views/401.html'
		})

		.otherwise({ redirectTo: '/' });
	
}]);


/**
* Block element config, set what request to automatically block
*/
app.config(['blockUIConfig', function(blockUIConfig) {

	blockUIConfig.message = 'Loading...';

	blockUIConfig.requestFilter = function(config) {

		if (!config.url.match(/^api\/v1\/alumni*/)) {
			return false; // ... don't block it.
		}
	};

}]);

/**
* Set user permissions from server data to memory variable
*/
app.run(function(permissions) {
	permissions.setPermissions(permissionList);
});


angular.element(document).ready(function() {

	//get data from hidden input and decrypt
    permissionList = angular.fromJson(window.atob(document.getElementById("user-rights").value));

    //Run angular application
    angular.bootstrap(document, ['app']);

});


/**
* Disable RequestJS  cache while on development
*/
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});