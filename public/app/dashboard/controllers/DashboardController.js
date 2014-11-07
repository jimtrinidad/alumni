angular.module('app').components.controller('AlumniController', ['$scope', 'alumniService', function ($scope, alumniService) {

	$scope.data = 'test data from controller ';
	
	alumniService
	.listAlumni()
	.then(
		function(data) {
			$scope.data = data;
		},
		function(data) {
			console.log(data);
		}
	);

}])