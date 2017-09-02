(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('manageTeaTypes', {
            controller: ManageTeaTypesController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.tea.types/manage.tea.types.component.html',
            bindings: {
                teaTypes: '<'
            }
        });

    ManageTeaTypesController.$inject = ['$mdDialog'];

    function ManageTeaTypesController($mdDialog) {
        var self = this;

        self.$onInit = function() {
            self.teaTypes = self.teaTypes.data;
        };

        self.openDialog = function(event, teaType) {
            $mdDialog.show({
                templateUrl: 'pages/templates/addTeaType.html',
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    teaType: teaType,
                    teaTypes: self.teaTypes,
                },
                controllerAs: 'ctrl',
                controller: function(TeaFactory, teaType, teaTypes) {
                    var self = this;
                    var isEdit = false;
                    self.teaTypes = teaTypes;
                    self.teaImage = {};

                    self.title = 'Add Tea Type';
                    
                    self.save = function() {
                        var isFound = self.teaTypes.find(function(obj) {
                            return obj.name ===self.teaType.name;
                        });

                        if (isFound) {
                            // self.teaTypeForm.teaTypeName.$error = true;
                            self.isAlreadyExists = true;
                        } else {
                            TeaFactory.addTeaType(self.teaType).then(function(result) {
                                $mdDialog.hide();
                                self.teaTypes.push(result.data);
                            }).catch(function(err) {
                                console.log('failed to update the requested tea', err);
                            });
                        }
                    }

                    self.refreshValidation = function() {
                        self.isAlreadyExists = false;
                    }

                    self.close = function() {
                        $mdDialog.hide();
                    }
                }
            });
        }
    }
})();