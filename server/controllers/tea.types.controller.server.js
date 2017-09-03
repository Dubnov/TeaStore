'use strict';

const mongoose = require('mongoose');
const TeaType = mongoose.model('TeaType');
const socket = require('../socket.io.js');

module.exports.getAllTeaTypes = (req, res) => {
    TeaType.find().then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.addTeaType = (req, res) => {
    let teaType = new TeaType(req.body);
    
    teaType.save().then(result => {
        res.json(result);
        socket.emit('teaTypeAdded', result.toJSON());
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}