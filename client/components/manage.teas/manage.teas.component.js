(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('manageTeas', {
            controller: ManageTeasController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.teas/manage.teas.component.html',
            bindings: {
                teas: '<',
				teaTypeList: '<'
            }
        });

    ManageTeasController.$inject = ['$mdDialog', 'TeaFactory'];

    function ManageTeasController($mdDialog, TeaFactory) {
        var self = this;
		
		self.$onInit = function() {
			self.teas = initData(self.teas.data);
			self.teaTypeList = self.teaTypeList.data;
			self.orderbyfilter = "";
			self.addToCart = true;
			self.showPrice = true;
			self.caffeineLevels = TeaFactory.getAllCaffeineLevels();
		
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
        
        self.openDialog = function(event, tea) {
            $mdDialog.show({
                templateUrl: 'pages/templates/addEditTea.html',
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    tea: tea,
                    teaTypes: self.teaTypeList,
                    caffeineLevels: self.caffeineLevels
                },
                controllerAs: 'ctrl',
                controller: function(TeaFactory, tea, teaTypes, caffeineLevels) {
                    var self = this;
                    self.tea = tea;
                    self.teaTypes = teaTypes;
                    self.caffeineLevels = caffeineLevels;

                    self.save = function() {
                        // var tea = {
                        //     name: '',
                        //     price: 0,
                        //     caffeineLevel: 0,
                        //     description: '',
                        //     image: '',
                        //     teaType: '',
                        //     updateDate: new Date(),
                        //     creationDate: new Date()
                        // }

                        TeaFactory.addTea(self.tea).then(data => {
                            console.log(data);
                            $mdDialog.hide();
                        }).catch(() => {
                            console.log('failed to add the requested tea');
                        });
                    }
                }
            })
        }
    }
})();