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
                    showPrice: '='
                },
                templateUrl: 'pages/templates/teaItem.html',
                link: function(scope, element, attrs) {
                    scope.imageUrl = scope.tea.image ? 'public/Images/' + scope.tea.image : 'public/Images/tea.jpg';
                }
            }
    }]);
})();

