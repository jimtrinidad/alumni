/**
* Global Controller
* mostly function/data for the whole application
*/
angular.module('app').controller('GlobalController', [
	'$scope', 
	'$location', 
	'permissions', 
	'blockUI',
    'Config',
	function($scope, $location, permissions, blockUI, Config){

		$scope.configRights           = Config.rights();
        $scope.configPrograms         = Config.programs();

		// set block ui on a global variable
		uiBlocker	= blockUI;
	
		$scope.path = $location.path();
		
		$scope.$on('$routeChangeStart', function(scope, next, current) {

			$scope.path = $location.path();
	        if (angular.isDefined(next.$$route) && angular.isDefined(next.$$route.permission) && !permissions.hasPermission(next.$$route.permission)) {
	            $location.path('/forbidden');
	        }

	    });

	    $scope.fullpage = function() {

	    	var full_pages = ['/forbidden','/unauthorized','/404']
	    	if(full_pages.indexOf($scope.path) > -1) {
	    		return true;
	    	}

	    	return false;
	    }

}]);

/**
* Header Controller for navigation menu
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