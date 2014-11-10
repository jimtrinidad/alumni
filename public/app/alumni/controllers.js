angular.module('app').components.controller('AlumniController', ['$scope', '$timeout', 'Alumni', 'Program',
    function($scope, $timeout, Alumni, Program) {

        $scope.programs         = Program.user();

        $scope.alumni 			= [];
        $scope.currentPage 		= 1;
        $scope.filters 			= {};
        $scope.filters.field 	= 'firstname';
        $scope.filters.sort 	= 'firstname';
        $scope.filters.program  = '';
        $scope.filters.size 	= 50;

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

        $scope.get_alumni = function() {
            $scope.alumni = [];
            var params = angular.copy($scope.filters);
            params = angular.extend(params, {
                page: $scope.currentPage
            });
            Alumni.query(params, function(response) {
                $timeout(function() {
                    $scope.alumni = response;
                }, 500);
            });
        };
        $scope.$on('page.changed', function(event, page) {
        	if($scope.currentPage !== page) {
	            $scope.currentPage = page;
	            $scope.get_alumni();
	        }
        });

        var timeoutPromise;
        var delayInMs = 1000;
        $scope.$watch("filters", function(e, i) {
            $timeout.cancel(timeoutPromise);
            timeoutPromise = $timeout(function() {
                //return to firstpage
                $scope.currentPage = 1;
                $scope.get_alumni();
            }, delayInMs);
        }, true);
    }
])
