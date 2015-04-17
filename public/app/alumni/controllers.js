/**
* ALUMNI MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('AlumniController', [
    '$scope', 
    '$timeout', 
    '$filter',
    'Alumni', 
    'Program',
    'User',
    'modalService',
    function($scope, $timeout, $filter, Alumni, Program, User, modalService) {

        /**
        * Inits
        */
        var timeoutPromise;
        $scope.rights           = User.rights();
        $scope.programs         = Program.user();
        $scope.alumni 			= [];
        $scope.selectedItem     = [];
        $scope.displayedFields  = ['firstname','lastname', 'batch', 'company', 'position','acronym'];
        $scope.currentPage 		= 1;
        $scope.filters 			= {
                field   : 'firstname',
                sort    : 'alumni.firstname',
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
            	'alumni.firstname' 	: 'Firstname',
            	'alumni.lastname' 	: 'Lastname',
            	'alumni.batch' 		: 'Batch',
            	'programs.name' 	: 'Program',
                'alumni.created_at' : 'Date Added'
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

            var resultBlocker  = uiBlocker.instances.get('alumniResultBlock');
            var params  = angular.copy($scope.filters);

            params      = angular.extend(params, {
                page: $scope.currentPage
            });

            resultBlocker.start('Fetching data...');

            Alumni.query(params, function(response) {
                $timeout(function() {
                    $scope.alumni = response;
                });

                resultBlocker.stop();
            });

        };

        $scope.viewable = function(key) {
            return ($scope.displayedFields.indexOf(key) > -1);
        }

        $scope.displayData  = function(data, key) {
            if (typeof(data[key]) !== 'undefined' && key !== 'batch' && (data[key].toUpperCase() === 'NA' || data[key].toUpperCase() === 'N/A')) {
                return 'n/a';
            } else {
                if (key === 'alumni.created_at'){
                    if (data['created_at'] === '0000-00-00 00:00:00' || data['created_at'] === '1970-01-01 00:00:00') {
                        return 'n/a';
                    } else {
                        return $filter('date')(data['created_at'].substring(0, 10), 'mediumDate');
                    }
                } else if (typeof(data[key]) !== 'undefined') {
                    if (data[key] === '' || data[key] === '0000-00-00' || data[key] === '1970-01-01') {
                        return 'n/a';
                    } else {
                        if (key === 'birthday') {
                            return $filter('date')(data['birthday'], 'mediumDate');
                        } else {
                            return data[key];
                        }
                    }
                } else {
                    return 'n/a';
                }
            }
        }


        /**
        * Adding Alumni
        */
        $scope.openForm = function(index) {

            $scope.itemIndex = index;

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
    '$filter',
    'Alumni',
    function($scope, $modalInstance, $filter, Alumni) {

        var formBlock       = uiBlocker.instances.get('alumniFormBlock');
        var mode            = angular.isDefined($scope.alumni.data[$scope.itemIndex]) ? 'edit' : 'add';
        var birthday        = '';
        var submitted       = null;

        if (mode === 'edit') {

            $scope.formData         = angular.copy($scope.alumni.data[$scope.itemIndex]);
            $scope.formTitle        = $scope.formData.firstname + ' ' + $scope.formData.lastname;

            birthday                = $scope.formData.birthday;
            if (birthday !== '' && birthday !== '0000-00-00' && birthday !== '1970-01-01') {
                $scope.formData.birthday    = $filter('date')(birthday, 'mediumDate');
            } else {
                $scope.formData.birthday    = '';
            }
            
        } else {

            $scope.formData     = {};
            $scope.formTitle    = 'Add new record';

        }

        $scope.setBirthday      = function(value) {
            angular.element('#alumni-birthday-input').datepicker({
                format: 'M d, yyyy',
                endDate: '+0d'
            });

            if (mode === 'edit' && birthday !== '' && birthday !== '0000-00-00' && birthday !== '1970-01-01') {
                angular.element('#alumni-birthday-input').datepicker('setDate', new Date(birthday));
                angular.element('#alumni-birthday-input').datepicker('update');
            } else {
                angular.element('#alumni-birthday-input').val('');
            }
        }

        $scope.hasError     = function(form, field) {

            if (submitted) {
                return field.$invalid && field.$dirty || (submitted && !field.$dirty && field.$invalid);
            } else {
                return form && field.$invalid && field.$dirty;
            }

            return false;

        }

        $scope.submitForm   = function() {

            //to resolve promise and close modal
            //$modalInstance.close('closed triggered');

            submitted   = true;

            //check if no client error.. then submit on server to validate and save.
            if ($scope.alumniForm.$valid) {
                console.log('saved');
                if (mode !== 'edit') {
                    formBlock.start('Adding data...');
                    Alumni.save($scope.formData, function(response) {
                        console.log(response);
                        formBlock.stop();
                    });
                } else {
                    formBlock.start('Updating data...');
                    Alumni.update($scope.formData, function(response) {
                        console.log(response);
                        formBlock.stop();
                    });
                }

            } else {
                console.log($scope.formData, 'invalid');
            }
            
        };

        $scope.close        = function(result) {
            $modalInstance.dismiss('cancel');
        };

    }

]);