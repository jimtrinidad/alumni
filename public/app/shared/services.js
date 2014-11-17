/**
* Modal service
*/
angular.module('app').service('modalService', ['$modal',
    function($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg'
        };

        this.showModal = function(customModalDefaults) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults);
        };

        this.show = function(customModalDefaults) {
            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
            
            tempModalDefaultsCtrl.$inject = ['$scope', '$modalInstance'];

            function tempModalDefaultsCtrl($scope, $modalInstance) {

                $scope.ok = function(result) {
                    $modalInstance.close(result);
                };
                $scope.close = function(result) {
                    $modalInstance.dismiss('cancel');
                };

            };

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = tempModalDefaultsCtrl;
            }

            return $modal.open(tempModalDefaults).result;
        };
    }
]);