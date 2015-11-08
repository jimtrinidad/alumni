/**
* PROGRAMS MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('ProgramController', [
	'$scope',
	'Program'
    function($scope, Program) {

    	/**
    	* Functions
    	*/
        $scope.getPrograms 	= function () {

        	var resultBlocker  	= uiBlocker.instances.get('programResultBlock');

            resultBlocker.start('Fetching data...');

            Alumni.query(params, function(response) {
                $timeout(function() {
                    $scope.programs           = response;
                    $scope.selectedItem     = [];
                    resultBlocker.stop();
                });

            });

        }

    }
])
