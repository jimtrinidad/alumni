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
                    resultBlocker.stop();
                });

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

            });

        }

        /**
        * Delete
        */
        $scope.removeAlumni = function(item, index) {
            bootbox.confirm('Are you sure you want to remove ' + item.firstname + ' ' + item.lastname + ' from ' + item.acronym + ' ' + item.batch + '?', function(result) {
                if (result) {
                    Alumni.delete({id: item.id}, function(response) {
                        if (response.status) {
                            $scope.alumni.data.splice(index, 1);
                            $scope.alumni.total--; 
                            toastr["success"](response.message, "Alumni");
                        } else {
                            toastr["warning"](response.message, "Alumni");
                        }
                    });
                }
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

        $scope.submitted    = false;
        $scope.formData     = {};

        if (mode === 'edit') {

            angular.copy($scope.alumni.data[$scope.itemIndex], $scope.formData);
            $scope.formTitle        = $scope.formData.firstname + ' ' + $scope.formData.lastname;

            birthday                = $scope.formData.birthday;
            if (birthday !== '' && birthday !== '0000-00-00' && birthday !== '1970-01-01') {
                $scope.formData.birthday    = $filter('date')(birthday, 'mediumDate');
            } else {
                $scope.formData.birthday    = '';
            }

            if ($scope.formData.email_prefer.toLowerCase() == 'na' || $scope.formData.email_prefer.toLowerCase() == 'n/a') {
                $scope.formData.email_prefer = '';
            }

            if ($scope.formData.email_other.toLowerCase() == 'na' || $scope.formData.email_other.toLowerCase() == 'n/a') {
                $scope.formData.email_other = '';
            }
            
        } else {

            $scope.formData     = {
                address     : "",
                batch       : "",
                birthday    : "",
                company     : "",
                email_other : "",
                email_prefer: "",
                firstname   : "",
                gender      : "",
                lastname    : "",
                mi          : "",
                nickname    : "",
                no_fax      : "",
                no_home     : "",
                no_mobile   : "",
                no_work     : "",
                position    : ""    
            };
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

        $scope.submitForm   = function() {

            $scope.submitted    = true;

            //check if no client error.. then submit on server to validate and save.
            if ($scope.alumniForm.$valid) {

                if (mode !== 'edit') {
                    formBlock.start('Adding data...');
                    Alumni.save($scope.formData, function(response) {
                        
                        if (response.status === true) {
                            $scope.get_alumni();
                            $modalInstance.close();
                        } else {
                            angular.forEach(response.message, function(m, f){
                                if(f.indexOf("email") >= 0) {
                                    $scope.alumniForm[f].$setValidity('email', false);
                                } else {
                                    $scope.alumniForm[f].$setValidity('required', false);
                                }
                            });
                        }

                        formBlock.stop();

                    });
                } else {
                    formBlock.start('Updating data...');
                    Alumni.update($scope.formData, function(response) {

                        if (response.status === true) {

                            toastr["success"](response.message, "Alumni");
                            angular.copy($scope.formData, $scope.alumni.data[$scope.itemIndex]);
                            $modalInstance.close();

                        } else {

                            if (angular.isDefined(response.code) && response.code === 400) {

                                toastr["warning"]("Update failed. Record was not found.", "Alumni");
                                $modalInstance.close();
                                $scope.get_alumni();

                            } else {

                                angular.forEach(response.message, function(m, f){
                                    if(f.indexOf("email") >= 0) {
                                        $scope.alumniForm[f].$setValidity('email', false);
                                    } else {
                                        $scope.alumniForm[f].$setValidity('required', false);
                                    }
                                });

                                toastr["error"]("There are some invalid inputs on the alumni form.", "Alumni");

                            }

                        }
                        
                        formBlock.stop();

                    });
                }

            } else {
                toastr["error"]("There are some invalid inputs on the alumni form.", "Alumni");
            } 
            
        };

        $scope.hasError = function(field, validation){

            if (validation) {
                return ($scope.alumniForm[field].$dirty && $scope.alumniForm[field].$error[validation]) || ($scope.submitted && $scope.alumniForm[field].$error[validation]);
            }
            return ($scope.alumniForm[field].$dirty && $scope.alumniForm[field].$invalid) || ($scope.submitted && $scope.alumniForm[field].$invalid);

        };

        $scope.close        = function(result) {
            $modalInstance.dismiss('cancel');
        };

    }

]);