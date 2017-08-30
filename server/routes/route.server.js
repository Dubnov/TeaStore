'use strict';

const teasController = require('../controllers/teas.controller.server');
const path = require('path');


module.exports = (app) => {
    app.route('/').get((req, res) => {        
		res.sendFile(path.resolve('server/views/index.html'));
	});

    app.route('/api/teas').get(teasController.getAllTeas);
    app.route('/api/teas/:id').get(teasController.getTeaById);
    app.route('/api/teatypes/add').get(teasController.addTeaTypes);

    app.route('/api/teatypes').get(teasController.getAllTeaTypes);
}