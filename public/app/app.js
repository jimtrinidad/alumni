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
			'blockUI',
			//'angular.filter'
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
						'app/program/services',
						'app/user/services'
					]);
				}
			},
			permission: 'admin'
		})
		.when('/programs', {
			permission: 'asdasd'
		})
		.when('/users', {

		})
		.when('/settings/general', {
		})
		.when('/settings/notifications', {
		})
		.when('/settings/security', {
		})
		.when('/404', { //page not found
			templateUrl: 'app/shared/views/404.html'
		})
		.when('/forbidden', { //permission denied
			templateUrl: 'app/shared/views/403.html',
		})
		.when('/unauthorized', { //required login
			templateUrl: 'app/shared/views/401.html',
		})

		.otherwise({ redirectTo: '/' });
	
}]);


/**
* Http Interceptor
*/
app.config(['$httpProvider',function($httpProvider) {
	$httpProvider.responseInterceptors.push(['$q', '$location', function($q, $location) { 
		return function(promise) { 
			return promise.then( 
				// Success: just return the response 
				function(response){ 
					return response; 
				}, 
				// Error: check the error status to get only the 401 
				function(response) { 
					if (response.status === 401) {
						$location.path('/unauthorized');
						return $q.reject(response);
					}
				} 
			); 
		} 
	}]);
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


/**
* boot angular when dom is ready
*/
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