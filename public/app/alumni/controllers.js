/**
* ALUMNI MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('AlumniController', [
    '$scope', 
    '$timeout', 
    'Alumni', 
    'Program',
    'modalService',

    function($scope, $timeout, Alumni, Program, modalService) {

        $scope.programs         = Program.user();
        $scope.alumni 			= [];
        $scope.currentPage 		= 1;
        $scope.filters 			= {
                field   : 'firstname',
                sort    : 'firstname',
                program : '',
                size    : 50
            };
        $scope.fields_options	= {
            	firstname	: 'Firstname',
            	lastname	: 'Lastname',
            	position 	: 'Position',
            	company 	: 'Company'
            };
        $scope.sort_options		= {
            	firstname 	: 'Firstname',
            	lastname 	: 'Lastname',
            	batch 		: 'Batch',
            	name 		: 'Program'
            };

        $scope.get_alumni   = function() {

            var params  = angular.copy($scope.filters);
            params      = angular.extend(params, {
                page: $scope.currentPage
            });

            Alumni.query(params, function(response) {
                $timeout(function() {
                    $scope.alumni = response;
                    $scope.$broadcast("alumni_list_changed");
                }, 100);
            });

        };

        $scope.$on('page.changed', function(event, page) {

        	if($scope.currentPage !== page) {
	            $scope.currentPage = page;
	            $scope.get_alumni();
	        }

        });

        var timeoutPromise;
        $scope.$watch("filters", function(e, i) {
            $timeout.cancel(timeoutPromise);
            timeoutPromise = $timeout(function() {
                //return to firstpage
                $scope.currentPage = 1;
                $scope.get_alumni();
            }, 1000);
        }, true);


        /**
        * Adding Alumni
        */

        $scope.openForm = function() {

            modalService.showModal(
            {

                controller  : 'AlumniFormController',
                templateUrl :'app/alumni/views/modal.form.alumni.html',
                size        : 'lg',
                keyboard    : false

            }).then(function (result) {
                console.log(result);
            });

        }
    }
]);


angular.module('app').components.controller('AlumniFormController', [
    '$scope',
    '$modalInstance',

    function($scope, $modalInstance) {

        $scope.save       = function() {
            $modalInstance.close($scope.body);
        };
        $scope.close    = function(result) {
            $modalInstance.dismiss('cancel');
        };

        $scope.body     = 'this is a messag from controller';



    }

]);