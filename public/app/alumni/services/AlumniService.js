angular.module('app')
.components.provide.service('alumniService', function () {
	this.get = function () {
		console.log('service called');
		return 'this is a data from service';
	}
});