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

    ManageTeasController.$inject = ['$mdDialog', 'TeaFactory', '$timeout', 'socketService'];

    function ManageTeasController($mdDialog, TeaFactory, $timeout, socketService) {
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
        
        socketService.on('teaTypeAdded', function(data) {
			self.teaTypeList.push(data);
		});

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

        function getTeas() {
            TeaFactory.getAllTeas().then(function(result) {
                self.teas = initData(result.data);
            });
        }
        
        self.deleteTea = function(teaId) {
            TeaFactory.deleteTea(teaId).then(function() {
                self.removedTea = teaId;

                $timeout(function(){
                    getTeas();
                }, 600);
            });
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
                controller: function(TeaFactory, tea, teaTypes, caffeineLevels, Upload) {
                    var self = this;
                    var isEdit = false;
                    self.tea = angular.copy(tea);
                    self.teaTypes = teaTypes;
                    self.caffeineLevels = caffeineLevels;
                    self.teaImage = {};

                    self.title = 'Add Tea';
                    if (self.tea) {
                        isEdit = true;
                        self.title = 'Edit Tea';
                        self.teaImage.name = self.tea.image;
                    }

                    self.save = function() {
                        Upload.upload({
                            url: '/api/upload',
                            data: {file: self.teaImage}
                        }).then(function(result) {
                            self.tea.image = result.data.filename;

                            if (isEdit) {
                                TeaFactory.updateTea(self.tea).then(function(result) {
                                    $mdDialog.hide();
                                    getTeas();
                                }).catch(function(err) {
                                    console.log('failed to update the requested tea', err);
                                });
                            } else {
                                TeaFactory.addTea(self.tea).then(function() {
                                    $mdDialog.hide();
                                    getTeas();
                                }).catch(function(err) {
                                    console.log('failed to update the requested tea', err);
                                });
                            }
                        }).catch(function(err) {
                            console.log('failed to upload the requested image');
                        });
                    }

                    self.close = function() {
                        $mdDialog.hide();
                    }
                }
            });
        }
    }
})();