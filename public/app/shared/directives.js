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
            link: function link(scope, element, attrs) {
                scope.$on(attrs.scrollToTopWhen, function() {
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
 * detect when scroll reach certain value,
 * used on scrolling results, keep headers visible
 * return (boolean) boolScrolledOnTop
 */
angular.module('app').directive("scroll", ['$window', 
    function($window) {
        return function(scope, element, attrs) {
            scope.boolScrolledOnTop = false;
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 80) {
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
                         "<button class='btn btn-xs btn-primary dropdown-toggle'>{{label}} <span class='caret'></span></button>" + 
                         "<ul class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu'>" + 
                            "<li ng-repeat='(value, label) in options' class='checklist'> <a href='javascript:;' ng-click='setSelectedItem(value); $event.stopPropagation()'><i class='fa' ng-class='isChecked(value)'></i><span>{{label}}</span></a></li>" + 
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
                        if (this.pageYOffset >= 80) {
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
* usage add attribute (table-checkbox="alumni" checked-item="selectedItem")
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

                scope.init          = function() {
                    
                    scope.selectAllTpl  = angular.element('<th><input type="checkbox" ng-model="checkAll" ng-click=toggleAll()></th>');
                    $compile(scope.selectAllTpl)(scope);
                    element.find('thead > tr').prepend(scope.selectAllTpl);

                };

                scope.setCheckboxes = function() {

                    scope.itemCount     = angular.isDefined(scope.results) ? scope.results.length : 0;
                    scope.checkedItem   = [];
                    scope.checkAll      = false; 

                    //wrapped in timeout to wait for the angular expression to compile
                    $timeout(function() {
                        angular.forEach(element.find('tbody > tr'), function(e,i) {

                            var rowElem     = angular.element(e);
                            rowElem.on('click', function() {
                                scope.toggleItem(rowElem, rowElem.data('id'));
                            })
                            scope.selectSingleTpl   = angular.element('<td><input type="checkbox" ng-checked="checkAll"></td>');
                            $compile(scope.selectSingleTpl)(scope);
                            rowElem.prepend(scope.selectSingleTpl);

                        });
                    });

                };

                scope.toggleAll     = function() {

                    if(!scope.checkAll) {
                        element.find('input[type=checkbox]').prop('checked', true);
                        angular.forEach(element.find('tbody > tr'), function(e,i) {
                            var rowElem     = angular.element(e);
                            scope.checkedItem.push(rowElem.data('id'));
                        });
                    } else {
                        element.find('input[type=checkbox]').prop('checked', false);
                        scope.checkedItem = [];
                    }

                };

                scope.toggleItem    = function(element, value) {

                    if (scope.checkedItem.indexOf(value) > -1) {

                        element.find('input[type=checkbox]').prop('checked', false);
                        scope.checkedItem.splice(scope.checkedItem.indexOf(value), 1);

                    } else {

                        element.find('input[type=checkbox]').prop('checked', true);
                        scope.checkedItem.push(value);

                    }

                    console.log(scope.checkedItem);
                    return false;

                };

                scope.init();
                scope.$watch("results", scope.setCheckboxes);

            }
        };
    }
]);