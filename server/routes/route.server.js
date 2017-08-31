'use strict';

const teasController = require('../controllers/teas.controller.server');
const storesController = require('../controllers/stores.controller.server');
const path = require('path');


module.exports = (app) => {
    app.route('/').get((req, res) => {        
		res.sendFile(path.resolve('server/views/index.html'));
	});

    app.route('/api/teas')
        .get(teasController.getAllTeas)
        .post(teasController.addTea)
        .put(teasController.updateTea);

    app.route('/api/teas/:id')
        .get(teasController.getTeaById)
        .delete(teasController.deleteTea);
        
    app.route('/api/teatypes/add').get(teasController.addTeaTypes);

    app.route('/api/teatypes').get(teasController.getAllTeaTypes);

    app.route('/api/stores').get(storesController.getAllStores);
    app.route('/api/stores/add').get(storesController.addStores);

    app.route('/api/cart').get(teasController.cartCheckout);

}