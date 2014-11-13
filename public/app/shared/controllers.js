/**
* Global Controller
*/
angular.module('app').controller('GlobalController', ['$scope', '$window', function($scope, $window){
	

}]);

/**
* Header Controller for navication menu
*/
angular.module('app').controller('HeaderController', ['$scope', '$location', function ($scope, $location) {

	$scope.isActive = function(route, easy) {
		if (!angular.isUndefined(easy)) {
			return ($location.path().substr(0, route.length) === route);
		} else {
			return ($location.path() === route);
		}
	}
	
}]);