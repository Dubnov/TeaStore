const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

try {
	mongoose.connect('mongodb://127.0.0.1:27017/teastore').then(() => {
		app.use('/public', express.static('public'));
		app.use('/node_modules', express.static('node_modules'));
		app.use(express.static('client'));
		// app.use('/pages', express.static('pages'));

		// Require all mongoose models
		require(path.resolve('server/models/tea.model.server'))
		require(path.resolve('server/models/tea.type.model.server'))

		// Require the routes of the project
		require(path.resolve('server/routes/route.server'))(app);	
		
		app.listen(8080, function(){
			console.log("app listening on port 8080");
		});
	}).catch(err => {
		console.log(err);
		throw err;
	});

} catch (err) {
	cconsole.log(err);
	throw err;
}