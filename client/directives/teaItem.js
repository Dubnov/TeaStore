(function() {
    'use strict';

    angular
        .module('teaStore')
        .directive('teaItem', ['TeaFactory', function(TeaFactory){
            return {
                restrict: 'E',
                replace: true,
                transclude:true,
                scope:{
                    tea: '=',
                    addToCart: '=',
                    showPrice: '=',
                    manager: '='
                },
                templateUrl: 'pages/templates/teaItem.html',
                link: function(scope, element, attrs) {
                    scope.deleteTea = function() {
                        if (manager) {
                            TeaFactory.deleteTea(scope.tea._id).then(function() {
                                $(element).fadeOut();
                            });
                        }
                    }
                }
            }
    }]);
})();

