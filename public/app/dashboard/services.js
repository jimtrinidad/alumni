angular.module('app').components.provide.service('alumniService', ['$http', '$q', function ($http, $q) {
	
	this.listAlumni	= function() {

		var deffered	= $q.defer();
		$http({
			method	: 'GET',
			url 	: 'api/v1/alumni'
		}).success(function(response) {
			deffered.resolve(response);
		}).error(function() {
			deffered.reject('Error on getting data.');
		});

		return deffered.promise;

	}

}]);