angular.module('app').components.controller('AlumniController', ['$scope', 'alumniService', function ($scope, alumniService) {

	$scope.data = 'test data from controller ' + alumniService.get() ;

}])