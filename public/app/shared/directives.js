/**
* Pagination directive
* usage : add (paginate="alumni") value is the paginate result of laravel including pagination properties
* option : add (middle="5") attribute, value is integer to set how many pages visible before the current page
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
                    
                    var middle = attrs.middle ? parseInt(attrs.middle) : 5,
                        min = 1,
                        max = scope.currentPage + middle - 1;
                    if (scope.currentPage > middle) {
                        min = scope.currentPage - middle + 1;
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
angular.module('app').directive("scrollToTopWhen", [ '$timeout', 
    function($timeout) {
        return {
            link: function link(scope, element, attrs) {
                scope.$on(attrs.scrollToTopWhen, function() {
                    $timeout(function() {
                        angular.element(element)[0].scrollIntoView(true);
                        var scrolledY = window.scrollY;
                        if(scrolledY){
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
angular.module('app').directive("scroll", function ($window) {
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
});