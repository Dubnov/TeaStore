angular.module('teaStore').
    controller('AllTeasController', ['$scope', 'teaList', 'teaTypeList', function($scope, teaList, teaTypeList){
		$scope.teas = teaList;
		$scope.teaTypes = teaTypeList;
        $scope.orderbyfilter = "";
        $scope.addToCart = true;
		$scope.showPrice = true;
		$scope.caffeineLevels = [{key:0,value:"Free"},{key:1,value:"Low"},{key:2,value:"Medium"},{key:3,value:"High"}];
	
		$scope.typeFilter = {};
		for (var i=0; i< teaTypeList.length; i++){
			$scope.typeFilter[teaTypeList[i].name]=true;
		} 
		
		$scope.caffeineFilter = {};
		for (var i=0; i< $scope.caffeineLevels.length; i++){
			$scope.caffeineFilter[$scope.caffeineLevels[i].key]=true;
		}

		$scope.filterByTeaType = function(tea){
			for	(var i=0; i< teaTypeList.length; i++){
				if ($scope.typeFilter[teaTypeList[i].name]){
					if (tea.teaType.name == teaTypeList[i].name){
						return true;
					}
				}
			}		
			return false;
		}
		
		$scope.filterByCaffeineLevel = function(tea){
			for	(var i=0; i< $scope.caffeineLevels.length; i++){
				if ($scope.caffeineFilter[$scope.caffeineLevels[i].key]){
					if (tea.caffeineLevel == $scope.caffeineLevels[i].key){
						return true;
					}
				}
			}		
			return false;
		}
    }]);