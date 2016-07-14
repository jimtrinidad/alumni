/**
* USERS MAIN ANGULAR CONTROLLER
*/
angular.module('app').components.controller('UserController', [
	'$scope',
	'$timeout',
	'User',
	'modalService',
    function($scope, $timeout, User, modalService) {

    	$scope.users 	= [];

        $scope.getUsers 	= function () {

        	var resultBlocker  	= uiBlocker.instances.get('resultBlock');

            resultBlocker.start('Fetching data...');

            User.query(function(response) {
                $timeout(function() {
                    $scope.users           	= response;
                    $scope.selectedItem     = [];
                    resultBlocker.stop();
                });

            });

        }

    	$scope.getUsers();

    	/**
        * Adding user
        */
        $scope.openForm = function(item) {

            var index = $scope.users.data.indexOf(item);
            $scope.itemIndex = index;

            modalService.showModal(
            {

                controller  : 'UserFormController',
                templateUrl : 'app/user/views/modal.form.user.html?' + "bust=" + (new Date()).getTime(), //add bust to disable caching on development
                size        : 'md',
                keyboard    : false,
                scope       : $scope

            });

        }


        /**
        * Delete
        */
        $scope.removeItem = function(item) {
            var index = $scope.users.data.indexOf(item);
            bootbox.confirm('Are you sure you want to disable ' + item.firstname + ' ' + item.lastname + '?', function(result) {
                if (result) {
                    User.delete({id: item.id}, function(response) {
                        if (response.status) {
                            $scope.users.data.splice(index, 1);
                            $scope.getUsers();
                            toastr["success"](response.message, "User");
                        } else {
                            toastr["warning"](response.message, "User");
                        }
                    });
                }
            }); 
        }

        $scope.restoreItem = function(item) {
            var index = $scope.users.data.indexOf(item);
            bootbox.confirm('Are you sure you want to restore ' + item.firstname + ' ' + item.lastname + '\'s account?', function(result) {
                if (result) {
                    User.restore({action: 'restore',id: item.id}, function(response) {
                        if (response.status) {
                            $scope.getUsers();
                            toastr["success"](response.message, "User");
                        } else {
                            toastr["warning"](response.message, "User");
                        }
                    });
                }
            }); 
        }

        $scope.deleteItem = function(item) {
            var index = $scope.users.data.indexOf(item);
            bootbox.confirm('Are you sure you want to permanently delete ' + item.firstname + ' ' + item.lastname + '\'s account?', function(result) {
                if (result) {
                    User.forceDelete({action: 'delete',id: item.id}, function(response) {
                        if (response.status) {
                            $scope.getUsers();
                            toastr["success"](response.message, "User");
                        } else {
                            toastr["warning"](response.message, "User");
                        }
                    });
                }
            }); 
        }

    }
]);

angular.module('app').components.controller('UserFormController', [
    '$scope',
    '$modalInstance',
    '$filter',
    '$timeout',
    'User',
    function($scope, $modalInstance, $filter, $timeout, User) {

        //manual add scroll fix on open, because uibootstrap does not trigger bootstrap modal events
        if ( $(window).height() < $(document).height() ) {
            $(document.body).addClass( 'modal-scrollbar' );
        }

        var formBlock       = uiBlocker.instances.get('modalFormBlock');
        var mode            = angular.isDefined($scope.users.data[$scope.itemIndex]) ? 'edit' : 'add';

        $scope.mode         = mode;
        $scope.submitted    = false;
        $scope.formData     = {};
        $scope.errors       = {};

        if (mode === 'edit') {

            angular.copy($scope.users.data[$scope.itemIndex], $scope.formData);
            angular.forEach($scope.formData, function(value, field){
                if (typeof(value) == 'string') {
                    $scope.formData[field] = value.trim();
                }
            });
            $scope.imgPreview 		= $scope.formData.photo;
            
            $scope.formTitle        = $scope.formData.name;

            $scope.changePassword       = false;
            $scope.formData.pwoption    = 'keep';
            
        } else {

            $scope.formData     = {
                firstname   : "",
                lastname    : "",
                email    	: "",
                username    : "",
            };

            $scope.formTitle        = 'Add new user';
            $scope.changePassword   = true;

        }

        $scope.submitForm   = function() {

            $scope.submitted    = true;

            //check if no client error.. then submit on server to validate and save.
            if ($scope.modalForm.$valid) {

                if (mode !== 'edit') {
                    formBlock.start('Adding data...');
                    User.save($scope.formData, function(response) {
                        
                        if (response.status === true) {
                            toastr["success"](response.message, "User");
                            $scope.getUsers();
                            $modalInstance.close();
                        } else {
                            angular.forEach(response.message, function(m, f) {
                                $scope.errors[f] = m[0];
                                $scope.modalForm[f].$setValidity(f, false);
                            });
                        }

                        formBlock.stop();

                    });
                } else {
                    formBlock.start('Updating data...');
                    //use save method, because will use post verb to pass to server, laravel do not accept multipart/form-data on put request
                    User.save($scope.formData, function(response) {

                        if (response.status === true) {

                            toastr["success"](response.message, "User");
                            angular.extend($scope.users.data[$scope.itemIndex], response.data);
                            $modalInstance.close();

                        } else {

                            if (angular.isDefined(response.code) && response.code === 400) {

                                toastr["warning"]("Update failed. Record was not found.", "User");
                                $modalInstance.close();
                                $scope.getUsers();

                            } else {

                                angular.forEach(response.message, function(m, f){
                                    $scope.errors[f] = m[0];
                                    $scope.modalForm[f].$setValidity(f, false);
                                });

                                toastr["error"]("There are some invalid inputs on the user form.", "User");

                            }

                        }
                        
                        formBlock.stop();

                    });
                }

            } else {
                //console.log($scope.modalForm.$error)
                toastr["error"]("There are some invalid inputs on the user form.", "User");
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

        $scope.showPasswordField = function() {

            if ($scope.formData.pwoption == 'keep') {
                $scope.changePassword = false;
            } else {
                $scope.changePassword = true;
            }

        }

        //unset field error on change
        angular.forEach(['username','email','password'], function(f) {
            $scope.$watch("formData." + f, function(i,e){
                $scope.modalForm[f].$setValidity(f, true);
            });
        });
        

    }

]);