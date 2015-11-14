/**
* PROGRAMS MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('ProgramController', [
	'$scope',
	'$timeout',
	'Program',
	'modalService',
    function($scope, $timeout, Program, modalService) {

    	$scope.programs 	= [];

        $scope.getPrograms 	= function () {

        	var resultBlocker  	= uiBlocker.instances.get('resultBlock');

            resultBlocker.start('Fetching data...');

            Program.query(function(response) {
                $timeout(function() {
                    $scope.programs           = response;
                    $scope.selectedItem     = [];
                    resultBlocker.stop();
                });

            });

        }

    	$scope.getPrograms();

    	/**
        * Adding program
        */
        $scope.openForm = function(index) {

            $scope.itemIndex = index;

            modalService.showModal(
            {

                controller  : 'ProgramFormController',
                templateUrl : 'app/program/views/modal.form.program.html?' + "bust=" + (new Date()).getTime(),
                size        : 'md',
                keyboard    : false,
                scope       : $scope

            });

        }


        /**
        * Delete
        */
        $scope.removeItem = function(item, index) {
            bootbox.confirm('Are you sure you want to remove ' + item.name + '?', function(result) {
                if (result) {
                    Program.delete({id: item.id}, function(response) {
                        if (response.status) {
                            $scope.programs.data.splice(index, 1);
                            toastr["success"](response.message, "Program");
                        } else {
                            toastr["warning"](response.message, "Program");
                        }
                    });
                }
            }); 
        }

    }
]);

angular.module('app').components.controller('ProgramFormController', [
    '$scope',
    '$modalInstance',
    '$filter',
    '$timeout',
    'Program',
    function($scope, $modalInstance, $filter, $timeout, Program) {

        //manual add scroll fix on open, because uibootstrap does not trigger bootstrap modal events
        if ( $(window).height() < $(document).height() ) {
            $(document.body).addClass( 'modal-scrollbar' );
        }

        var formBlock       = uiBlocker.instances.get('modalFormBlock');
        var mode            = angular.isDefined($scope.programs.data[$scope.itemIndex]) ? 'edit' : 'add';

        $scope.submitted    = false;
        $scope.formData     = {};

        if (mode === 'edit') {

            angular.copy($scope.programs.data[$scope.itemIndex], $scope.formData);
            angular.forEach($scope.formData, function(value, field){
                if (typeof(value) == 'string') {
                    $scope.formData[field] = value.trim();
                }
            });
            $scope.imgPreview 		= $scope.formData.logo;
            
            $scope.formTitle        = $scope.formData.name;
            
        } else {

            $scope.formData     = {
                acronym     : "",
                name       	: "",
                logo    	: ""    
            };

            $scope.formTitle    = 'Add new record';

        }

        $scope.submitForm   = function() {

            $scope.submitted    = true;

            //check if no client error.. then submit on server to validate and save.
            if ($scope.modalForm.$valid) {

                if (mode !== 'edit') {
                    formBlock.start('Adding data...');
                    Program.save($scope.formData, function(response) {
                        
                        if (response.status === true) {
                            toastr["success"](response.message, "Program");
                            $scope.getPrograms();
                            $modalInstance.close();
                        } else {
                            angular.forEach(response.message, function(m, f){
								$scope.modalForm[f].$setValidity('required', false);
                            });
                        }

                        formBlock.stop();

                    });
                } else {
                    formBlock.start('Updating data...');
                    //use save method, because will use post verb to pass to server, laravel do not accept multipart/form-data on put request
                    Program.save($scope.formData, function(response) {

                        if (response.status === true) {

                            toastr["success"](response.message, "Program");
                            angular.copy(response.data, $scope.programs.data[$scope.itemIndex]);
                            $modalInstance.close();
                            //$scope.getPrograms();

                        } else {

                            if (angular.isDefined(response.code) && response.code === 400) {

                                toastr["warning"]("Update failed. Record was not found.", "Program");
                                $modalInstance.close();
                                $scope.getPrograms();

                            } else {

                                angular.forEach(response.message, function(m, f){
                                    $scope.modalForm[f].$setValidity('required', false);
                                });

                                toastr["error"]("There are some invalid inputs on the program form.", "Program");

                            }

                        }
                        
                        formBlock.stop();

                    });
                }

            } else {
                toastr["error"]("There are some invalid inputs on the program form.", "Alumni");
            } 
            
        };

        $scope.hasError = function(field, validation){

            if (validation) {
                return ($scope.modalForm[field].$dirty && $scope.modalForm[field].$error[validation]) || ($scope.submitted && $scope.modalForm[field].$error[validation]);
            }
            return ($scope.modalForm[field].$dirty && $scope.modalForm[field].$invalid) || ($scope.submitted && $scope.modalForm[field].$invalid);

        };

        $scope.close        = function(result) {
            $modalInstance.dismiss('cancel');

            //manual remove scroll fix on close, because uibootstrap does not trigger bootstrap modal events
            $timeout(function() {
                $(document.body).removeClass( 'modal-scrollbar' );
            }, 297);
            
        };

    }

]);