/**
* PROGRAMS MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('ProgramController', [
	'$scope',
	'$timeout',
	'Program',
    function($scope, $timeout, Program) {

    	$scope.programs 	= [];

    	/**
    	* Functions
    	*/
        $scope.getPrograms 	= function () {

        	var resultBlocker  	= uiBlocker.instances.get('resultBlock');

            resultBlocker.start('Fetching data...');

            Program.query(function(response) {
                $timeout(function() {
                    $scope.programs           = response;
                    $scope.selectedItem     = [];
                    resultBlocker.stop();

                    

    	console.log($scope.programs);
                });

            });

        }

    	$scope.getPrograms();

    }
])
