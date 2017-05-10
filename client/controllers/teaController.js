angular.module('teaStore').
    controller('TeaController', ['$scope', '$routeParams', 'TeaFactory', function($scope, $routeParams, TeaFactory){
        $scope.addToCart = true;
        var teaId = parseInt($routeParams.teaId);
        if (angular.isNumber(teaId)){
            $scope.tea = TeaFactory.getTeaById(teaId);    
        }
    }]);