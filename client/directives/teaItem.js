angular.module('teaStore').
    directive('teaItem', function(){
        return {
            restrict: 'E',
            replace: true,
			transclude:true,
            scope:{
                tea: '=',
                addToCart: '=',
				showPrice: '='
            },
            templateUrl: 'pages/templates/teaItem.html'
		}
    });