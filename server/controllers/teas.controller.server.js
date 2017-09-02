'use strict';

const mongoose = require('mongoose');
const Tea = mongoose.model('Tea');
const socket = require('../socket.io.js');

module.exports.cartCheckout = (req, res) => {
    socket.emit('checkout', {message: 'succeeded'});
}

module.exports.getAllTeas = (req, res) => {
    Tea.aggregate([
        {
            $group: {
                 _id: '$teaType',
                 teas: { $push: '$$ROOT'}
            }
        }
    ]).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.getTeaById = (req, res) => {
    Tea.findById(req.params.id).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}

module.exports.addTea = (req, res) => {
    let tea = new Tea(req.body);

    tea.save().then(result => {
        res.json(result);
        socket.emit('teaAdded', result.toJSON());
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}

module.exports.updateTea = (req, res) => {
    Tea.findByIdAndUpdate(req.body._id, req.body, {new: true}).then(result => {
        res.json(result);
        socket.emit('teaUpdated', result.toJSON());        
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.deleteTea = (req, res) => {
    Tea.findByIdAndRemove(req.params.id).then(result => {
        res.json(result);
        socket.emit('teaRemoved', result.toJSON());                
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.uploadTeaImage = (req, res) => {
    res.json(req.file);
}