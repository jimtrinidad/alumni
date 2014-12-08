/**
* ALUMNI MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('AlumniController', [
    '$scope', 
    '$timeout', 
    'Alumni', 
    'Program',
    'User',
    'modalService',
    function($scope, $timeout, Alumni, Program, User, modalService) {

        /**
        * Inits
        */
        var timeoutPromise;
        $scope.rights           = User.rights();
        $scope.programs         = Program.user();
        $scope.alumni 			= [];
        $scope.selectedItem     = [];
        $scope.displayedFields  = ['firstname','lastname', 'batch', 'company', 'position'];
        $scope.currentPage 		= 1;
        $scope.formData         = [];
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


        /**
        * Listeners
        */
        $scope.$on('page.changed', function(event, page) {

        	if($scope.currentPage !== page) {
	            $scope.currentPage = page;
	            $scope.get_alumni();
	        }

        });

        $scope.$watch("filters", function(e, i) {
            $timeout.cancel(timeoutPromise);
            timeoutPromise = $timeout(function() {
                //return to firstpage
                $scope.currentPage = 1;
                $scope.get_alumni();
            }, 1000);
        }, true);


        /**
        * Functions
        */
        $scope.get_alumni   = function() {

            var params  = angular.copy($scope.filters);
            params      = angular.extend(params, {
                page: $scope.currentPage
            });

            Alumni.query(params, function(response) {
                $timeout(function() {
                    $scope.alumni = response;
                });
            });

        };

        $scope.viewable = function(key) {
            return ($scope.displayedFields.indexOf(key) > -1);
        }


        /**
        * Adding Alumni
        */
        $scope.openForm = function(data) {

            $scope.formData = data;

            modalService.showModal(
            {

                controller  : 'AlumniFormController',
                templateUrl : 'app/alumni/views/modal.form.alumni.html',
                size        : 'lg',
                keyboard    : false,
                scope       : $scope

            }).then(function (result) {
                console.log(result, 'contorl');
            });

        }

    }
]);


angular.module('app').components.controller('AlumniFormController', [
    '$scope',
    '$modalInstance',
    function($scope, $modalInstance) {

        $scope.save     = function() {

            //to resolve promise and close modal
            $modalInstance.close('closed triggered');
        };

        $scope.close    = function(result) {
            $modalInstance.dismiss('cancel');
        };

        console.log($scope.formData);

    }

]);