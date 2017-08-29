(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('teas', {
            templateUrl: 'components/all.teas/all.teas.component.html',
            controller: TeasController,
			controllerAs: 'ctrl',
			bindings: {
				teas: '<',
				teaTypeList: '<'
			}
        });

    TeasController.$inject = [];

    function TeasController() {
		var self = this;
		
		self.$onInit = function() {
			self.teas = initData(self.teas.data);
			self.teaTypeList = self.teaTypeList.data;
			self.orderbyfilter = "";
			self.addToCart = true;
			self.showPrice = true;
			self.caffeineLevels = [{key:0,value:"Free"},{key:1,value:"Low"},{key:2,value:"Medium"},{key:3,value:"High"}];
		
			self.typeFilter = {};
			for (var i=0; i< self.teaTypeList.length; i++){
				self.typeFilter[self.teaTypeList[i].name]=true;
			} 
			
			self.caffeineFilter = {};
			for (var i=0; i< self.caffeineLevels.length; i++){
				self.caffeineFilter[self.caffeineLevels[i].key]=true;
			}
		}

		self.filterByTeaType = function(tea){
			for	(var i=0; i< self.teaTypeList.length; i++){
				if (self.typeFilter[self.teaTypeList[i].name]){
					if (tea.teaType == self.teaTypeList[i].name){
						return true;
					}
				}
			}		
			return false;
		}
		
		self.filterByCaffeineLevel = function(tea){
			for	(var i=0; i< self.caffeineLevels.length; i++){
				if (self.caffeineFilter[self.caffeineLevels[i].key]){
					if (tea.caffeineLevel == self.caffeineLevels[i].key){
						return true;
					}
				}
			}		
			return false;
		}

		function initData(data) {
			if (!data) {
				return data;
			}
			var results = [];
			for (var i = 0; i < data.length; i++) {
				results = results.concat(data[i].teas);
			}

			return results;
		}
    }
})()