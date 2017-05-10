angular.module('teaStore').
    controller('HomeController', ['$scope', 'teaList',function($scope, teaList){
        $scope.teas = teaList;
        $scope.addToCart = false;
		$scope.showPrice = false;
    }]);