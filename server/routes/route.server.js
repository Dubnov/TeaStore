'use strict';

const teasController = require('../controllers/teas.controller.server');
const teaTypesController = require('../controllers/tea.types.controller.server');
const storesController = require('../controllers/stores.controller.server');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/Images/'));
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
        files: 1
    },
    fileFilter: imageFilter
});

function imageFilter(req, file, cb) {
    // accept image only
    if (!file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    
    cb(null, true);
};

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

    app.route('/api/upload').post(upload.single('file'), teasController.uploadTeaImage);

    app.route('/api/teatypes')
        .get(teaTypesController.getAllTeaTypes)
        .post(teaTypesController.addTeaType);

    app.route('/api/stores').get(storesController.getAllStores);
    app.route('/api/stores/add').get(storesController.addStores);

    app.route('/api/cart').get(teasController.cartCheckout);

}

