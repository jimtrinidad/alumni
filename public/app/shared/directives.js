/**
 * Pagination directive
 * usage : add (paginate="alumni") value is the paginate result of laravel including pagination properties
 * option : add (mkeydle="5") attribute, value is integer to set how many pages visible before the current page
 */
angular.module('app').directive('paginate', [
    function() {
        // Runs during compile
        return {
            scope: {
                results: '=paginate'
            },
            template: '<ul class="pagination pagination-sm" ng-show="totalPages > 1">' + '  <li><a href="javascript:;" ng-click="firstPage()">&laquo;</a></li>' + '  <li><a href="javascript:;" ng-click="prevPage()">&lsaquo;</a></li>' + '  <li ng-repeat="n in pages" ng-class="{active:currentPage == n}">' + '    <a href="javascript:;" ng-bind="n" ng-click="setPage(n)">1</a>' + '  </li>' + '  <li><a href="javascript:;" ng-click="nextPage()">&rsaquo;</a></li>' + '  <li><a href="javascript:;" ng-click="lastPage()">&raquo;</a></li>' + '</ul>',
            link: function(scope, element, attrs) {
                var paginate = function(results) {
                    if (!scope.currentPage || (results.current_page && results.current_page != scope.current_page)) {
                        scope.currentPage = results.current_page;
                    }
                    scope.total = results.total;
                    scope.totalPages = results.last_page;
                    scope.pages = [];
                    var mkeydle = attrs.mkeydle ? parseInt(attrs.mkeydle) : 5,
                        min = 1,
                        max = scope.currentPage + mkeydle - 1;
                    if (scope.currentPage > mkeydle) {
                        min = scope.currentPage - mkeydle + 1;
                    }
                    if (max >= scope.totalPages) {
                        max = scope.totalPages;
                    }
                    for (var i = min; i <= max; i++) {
                        scope.pages.push(i);
                    }
                    scope.nextPage = function() {
                        if (scope.currentPage < scope.totalPages) {
                            scope.currentPage++;
                        }
                    };
                    scope.prevPage = function() {
                        if (scope.currentPage > 1) {
                            scope.currentPage--;
                        }
                    };
                    scope.firstPage = function() {
                        scope.currentPage = 1;
                    };
                    scope.lastPage = function() {
                        scope.currentPage = scope.totalPages;
                    };
                    scope.setPage = function(page) {
                        scope.currentPage = page;
                    };
                };
                var pageChange = function(newPage, oldPage) {
                    if (newPage != oldPage && !angular.isUndefined(oldPage)) {
                        scope.$emit('page.changed', newPage);
                    }
                };
                scope.$watch('results', paginate);
                scope.$watch('currentPage', pageChange);
            }
        };
    }
]);

/**
 * move scroll to top on set element when triggered
 * usage: (scroll-to-top-when="alumni_list_changed"), just $broadcast the event
 */
angular.module('app').directive("scrollToTopWhen", ['$timeout',
    function($timeout) {
        return {
            scope : {
                scrollToTopWhen: '='
            },
            link: function link(scope, element, attrs) {
                scope.$watch('scrollToTopWhen', function() {
                    $timeout(function() {
                        angular.element(element)[0].scrollIntoView(true);
                        var scrolledY = window.scrollY;
                        if (scrolledY) {
                            window.scroll(0, scrolledY - 95);
                        }
                    });
                });
            }
        };
    }
]);

/**
 * detect when scroll reach certain value on scroll down,
 * used on scrolling results, keep headers visible
 * return (boolean) boolScrolledOnTop
 */
angular.module('app').directive("scroll", ['$window', 
    function($window) {
        return function(scope, element, attrs) {
            scope.boolScrolledOnTop = false;
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 75) {
                    scope.boolScrolledOnTop = true;
                } else {
                    scope.boolScrolledOnTop = false;
                }
                scope.$apply();
            });
        };
    }
]);

/**
* dropdown checklist
* model="displayedFields" - list of checked items
* options="alumni.labels" - list of checklist items
* label="Displayed Fields" - button label
* close-scroll="true" - close dropdown when scrolled down
*/
angular.module('app').directive('checklist', ['$window',
    function($window) {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                options: '=',
                closeScroll: '='
            },
            template: "<div class='btn-group dropdown'>" +
                         "<a class='btn btn-primary btn-text-size dropdown-toggle'><i class='fa fa-list'></i> <span class='hidden-xs'>{{label}}</span> <span class='caret'></span></a>" + 
                         "<ul class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu'>" + 
                            "<li ng-repeat='option in options' class='checklist'> <a href='javascript:;' ng-click='setSelectedItem(option.id); $event.stopPropagation()'><i class='fa' ng-class='isChecked(option.id)'></i><span>{{option.label}}</span></a></li>" + 
                        "</ul>" + 
                    "</div>",
            link: function(scope, element, attrs) { 

                scope.label = attrs.label;

                scope.setSelectedItem = function(key) {

                    if (scope.model.indexOf(key) > -1) {
                        scope.model.splice(scope.model.indexOf(key), 1);
                    } else {
                        scope.model.push(key);
                    }

                    return false;
                };

                scope.isChecked = function(key) {
                    if (scope.model.indexOf(key) > -1) {
                        return 'fa-check';
                    }
                    return false;
                };

                if (scope.closeScroll) {

                    angular.element($window).bind("scroll", function() {
                        if (this.pageYOffset >= 75) {
                            angular.element( '#' + attrs.id + ' .dropdown.open .dropdown-toggle').triggerHandler('click');
                        }
                    });

                }
            }
        }
    }
]);


/**
* add checkbox to a table
* usage add attribute (table-checkbox="alumni")
* @attr checked-item="selectedItem" variable to store selected items
*/
angular.module('app').directive('tableCheckbox', ['$compile', '$timeout',
    function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                results: '=tableCheckbox',
                checkedItem: '='
            },
            link: function (scope, element, attrs) {

                var lastChecked     = false;
                scope.allItems      = [];

                scope.init          = function() {
                    
                    scope.selectAllTpl  = angular.element('<th style="width: 24px;" class="table-checkbox" ng-click="toggleAll()"><input type="checkbox" ng-checked="isSelectedAll()"></th>');
                    $compile(scope.selectAllTpl)(scope);
                    element.find('thead > tr').prepend(scope.selectAllTpl);

                };

                scope.setCheckboxes = function() {


                    //reset
                    scope.checkedItem   = [];
                    scope.allItems      = [];
                    lastChecked         = false;

                    angular.forEach(scope.results, function(i) {
                        scope.allItems.push(i.id);
                    });
                    //wrapped in timeout to wait for the angular expression to compile
                    $timeout(function() {
                        angular.forEach(element.find('tbody > tr'), function(e,i) {

                            var rowElem             = angular.element(e);
                            scope.selectSingleTpl   = angular.element('<td class="table-checkbox" ng-class="{selected:isSelected('+rowElem.data('id')+'), currentSelected:isFocused('+rowElem.data('id')+')}" ng-click="toggleItem($event, '+rowElem.data('id')+')"><input type="checkbox" ng-checked="isSelected('+rowElem.data('id')+')"></td>');
                            $compile(scope.selectSingleTpl)(scope);
                            rowElem.prepend(scope.selectSingleTpl);

                        });
                    });

                };

                scope.isSelectedAll = function() {

                    if (angular.isDefined(scope.allItems) && scope.checkedItem.length === scope.allItems.length) {
                        return true;
                    } else {
                        return false;
                    }

                };

                scope.isSelected    = function(id) {

                    return scope.checkedItem.indexOf(id) > -1;

                };

                scope.isFocused     = function (id) {
                    return id === lastChecked;
                }

                scope.toggleAll     = function() {

                    if(!scope.isSelectedAll()) {
                        angular.copy(scope.allItems, scope.checkedItem);
                    } else {
                        scope.checkedItem = [];
                    }

                    $timeout(function() {
                        scope.$apply();
                    });
                };

                scope.toggleItem    = function(event, value) {

                    if (lastChecked === false) {
                        lastChecked = value;
                    }

                    if(event.shiftKey) {

                        var status  = scope.isSelected(value);
                        var start   = Math.min(scope.allItems.indexOf(lastChecked), scope.allItems.indexOf(value));
                        var end     = Math.max(scope.allItems.indexOf(lastChecked), scope.allItems.indexOf(value));

                        angular.forEach(scope.allItems, function(v,k) {
                            if (k >= start && k <= end) {
                                if (status) {
                                    if(scope.checkedItem.indexOf(v) > -1) {
                                        scope.checkedItem.splice(scope.checkedItem.indexOf(v), 1);
                                    }
                                } else {
                                    if (!scope.isSelected(v)) {
                                        scope.checkedItem.push(v);
                                    }
                                }
                            }
                        });
                        

                    } else {

                        if (scope.isSelected(value)) {
                            scope.checkedItem.splice(scope.checkedItem.indexOf(value), 1);
                        } else {
                            scope.checkedItem.push(value);
                        }

                    }


                    lastChecked = value;
                    $timeout(function() {
                        scope.$apply();
                    });

                };

                scope.init();
                scope.$watch("results", scope.setCheckboxes);

            }
        };
    }
]);


/**
 * this directive makes it so that every time the content of the file input changes, a FileList object is put inside the binded property instead of a fakepath
 * usage: <input type="file" files-model="someObject.files" multiple>
 * generate:
 *  - imagePreview: contains image data
 *  - uploadMsg: upload status
 */
angular.module('app').directive("filesModel", function () {
        return {
            controller: function($parse, $element, $attrs, $scope){
              var exp = $parse($attrs.filesModel);

              $element.on('change', function(){
                exp.assign($scope, this.files);
                $scope.uploadMsg = null;
                reader = new FileReader();
                if (typeof this.files[0] !== 'undefined') {
                    file = this.files[0];
                    if (file.size <= 2097152) { //max of 2mb, in bytes
                        var ext = file.type.split('/')[1];
                        if (['jpeg','png','gif','jpg'].indexOf(ext) !== -1) {
                            reader.readAsDataURL(file);
                            reader.onload = function (evt) {
                                $scope.imgPreview = evt.target.result;
                                $scope.$apply();
                            };
                        } else {
                            $scope.imgPreview   = null;
                            $scope.uploadMsg    = 'Invalid file type! Image files only.';
                        }
                    } else {
                        $scope.imgPreview   = null;
                        $scope.uploadMsg    = 'Invalid file size! Maximum of 2MB.';
                    }
                }
                $scope.$apply();
              });
            }
        };
    }
);

angular.module('app').directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        console.log(attrs.pwCheck, ctrl);
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
            console.log('test');
          scope.$apply(function () {
            console.log(elem.val(), $(firstPassword).val());
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);