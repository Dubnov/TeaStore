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

module.exports.fillData = (req, res) => {
    TeaType.find().then((results) => {
        if (results.length == 0) {
            const now = new Date();
            let arr = [
                {
                    name: 'Green',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'Black',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'Herbal',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'White',
                    creationDate: now,
                    updateDate: now
                },
                {
                    name: 'Oolong',
                    creationDate: now,
                    updateDate: now
                }
            ];

            TeaType.collection.insertMany(arr).then((d)=> {
                console.log(d);
            }).catch(err => {
                console.log(err);
            });
        }
    })
}